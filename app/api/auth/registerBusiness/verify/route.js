import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Business from "@/models/business.model";

export async function POST(req) {
    try {
        await connectDB();
        const { otp } = await req.json();

        if (!otp) {
            return NextResponse.json({ error: "OTP is required" }, { status: 400 });
        }

        const business = await Business.findOne({ otpCode: otp });
        if (!business) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        if (business.otpExpiry < new Date()) {
            return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
        }

        business.emailVerified = true;
        business.otpCode = null;
        business.otpExpiry = null;

        await business.save();

        return NextResponse.json({ message: "Email verified successfully", ok: true });
    } catch (error) {
        console.error("Verify business error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}