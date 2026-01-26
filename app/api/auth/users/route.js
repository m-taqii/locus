import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, role, status } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 });
    }

    let adminId;
    if (session.user.role !== "Admin" && session.user.role !== "Owner") {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 });
    }

    if (session.user.role == "Owner") {
      adminId = session.user.id;
    } else if (session.user.role == "Admin") {
      adminId = session.user.businessId;
    }

    if (!adminId) {
      return NextResponse.json({ error: "Session user ID not found" }, { status: 401 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }
    if (name.length < 3) {
      return NextResponse.json({ error: "Name must be at least 3 characters long" }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role,
      status,
      business: adminId
    });

    return NextResponse.json({ message: "User created", ok: true, userId: newUser._id });
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

    const users = await User.find({
      $or: [{
        business: businessId
      }, {
        business: session.user.businessId
      }]
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

