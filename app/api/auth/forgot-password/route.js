import businessModel from "@/models/business.model";
import userModel from "@/models/user.model";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    await connectDB();

    const { token, password } = await req.json();

    if (!token) {
        return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const user = await userModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).select("+password +resetPasswordToken +resetPasswordExpires");
    const business = await businessModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).select("+password")

    if (!user && !business) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    if (password.length > 128) {
        return NextResponse.json({ error: "Password must be at most 128 characters long" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (user) {
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
    }

    if (business) {
        business.password = hashedPassword;
        business.resetPasswordToken = null;
        business.resetPasswordExpires = null;
        await business.save();
    }

    return NextResponse.json({ status: 200, message: "Password reset successfully" });
}