import businessModel from "@/models/business.model";
import userModel from "@/models/user.model";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    const { token } = await req.json();
    console.log("Token received:", token);
    if (!token) {
        return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const user = await userModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).select("+resetPasswordToken +resetPasswordExpires")
    console.log("User found:", user);
    const business = await businessModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    console.log("Business found:", business);

    if (!user && !business) {
        return NextResponse.json({ status: 400, error: "Invalid or expired token" });
    }

    return NextResponse.json({ status: 200, message: "Token is valid" });
}