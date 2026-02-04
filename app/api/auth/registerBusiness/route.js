import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/db";
import Business from "@/models/business.model";
import { sendEmail } from "@/app/lib/services/email";
import { getOTPEmailTemplate } from "@/app/lib/emailTemplates";

export async function POST(req) {
  try {
    await connectDB();
    const { businessName, email, password, ownerName } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }
    if (!businessName) {
      return NextResponse.json({ error: "Business name is required" }, { status: 400 });
    }
    if (!ownerName) {
      return NextResponse.json({ error: "Owner name is required" }, { status: 400 });
    }

    const existing = await Business.findOne({ email });
    if (existing) return NextResponse.json({ error: "Business already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await sendEmail({
      to: email,
      subject: "Verify Your Email - Locus",
      html: getOTPEmailTemplate(ownerName, otpCode),
    });

    const newBusiness = await Business.create({
      ownerName,
      businessName,
      email,
      password: hashed,
      otpCode,
      otpExpiry,
    });

    return NextResponse.json({ message: "Business created", ok: true, businessId: newBusiness._id });
  } catch (error) {
    console.error("Register business error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}