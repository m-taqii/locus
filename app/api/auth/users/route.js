import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/db";
import User from "@/models/user.model";
import Business from "@/models/business.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { sendEmail } from "@/app/lib/services/email";
import { getUserInvitationEmailTemplate } from "@/app/lib/emailTemplates";
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, role, status } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 });
    }

    let adminId;
    let businessName;
    let inviterName;

    if (session.user.role !== "Admin" && session.user.role !== "Owner") {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 });
    }

    if (session.user.role == "Owner") {
      adminId = session.user.id;
      // Fetch business name for owner
      const business = await Business.findById(session.user.id);
      businessName = business?.businessName || "your team";
      inviterName = business?.ownerName || session.user.name;
    } else if (session.user.role == "Admin") {
      adminId = session.user.businessId;
      // Fetch business name for admin
      const business = await Business.findById(session.user.businessId);
      businessName = business?.businessName || "your team";
      inviterName = session.user.name;
    }

    if (!adminId) {
      return NextResponse.json({ error: "Session user ID not found" }, { status: 401 });
    }

    if (session.user.role === "Admin" && role === "Admin") {
      return NextResponse.json({ error: "Admins cannot create other Admins" }, { status: 401 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (name.length < 3) {
      return NextResponse.json({ error: "Name must be at least 3 characters long" }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const inviteToken = crypto.randomBytes(32).toString("hex");
    const newUser = await User.create({
      name,
      email,
      role,
      status,
      business: adminId,
      inviteToken,
      inviteTokenExpires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const inviteUrl = `${process.env.APP_URL}/invitation?token=${inviteToken}`;

    try {
      await sendEmail({
        to: email,
        subject: `You're invited to join ${businessName} - Locus`,
        html: getUserInvitationEmailTemplate(name, inviterName, businessName, role, inviteUrl),
      });
    } catch (error) {
      console.error("Error sending invitation email:", error);
    }

    return NextResponse.json({ message: "Invitation sent successfully", ok: true, userId: newUser._id });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();

    // Get the session to find which business the user belongs to
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const businessId = session.user.id; // The logged-in admin's ID is the business ID
    const userRole = session.user.role;

    // Build the query to find users belonging to this business
    const query = {
      $or: [{
        business: businessId
      }, {
        business: session.user.businessId
      }]
    };

    // If the requesting user is an Admin, exclude other Admins from results
    if (userRole === "Admin") {
      query.role = { $ne: "Admin" };
    }

    // Get pagination params from URL (e.g., /api/auth/users?page=1&limit=10)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;      // Default: page 1
    const limit = parseInt(searchParams.get('limit')) || 10;   // Default: 10 items per page

    // Calculate how many items to skip
    // Page 1: skip 0, Page 2: skip 10, Page 3: skip 20, etc.
    const skip = (page - 1) * limit;

    // Get total count of users (for calculating total pages)
    const totalItems = await User.countDocuments(query);

    // Get paginated users from database
    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Newest first

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

