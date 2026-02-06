import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import userModel from "@/models/user.model";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        await connectDB();
        const { token, password } = await req.json();

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        const user = await userModel.findOne({
            inviteToken: token,
            inviteTokenExpires: { $gt: Date.now() }
        }).select("+password +inviteToken +inviteTokenExpires");

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired invitation link" }, { status: 400 });
        }

        // Hash password and activate user
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.status = "active";
        user.inviteToken = null;
        user.inviteTokenExpires = null;
        await user.save();

        return NextResponse.json({ message: "Account activated successfully! You can now login." });

    } catch (error) {
        console.error("Verify token error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

// GET: Verify if invitation token is valid
export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const user = await userModel.findOne({
            inviteToken: token,
            inviteTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ valid: false, error: "Invalid or expired invitation" }, { status: 400 });
        }

        return NextResponse.json({
            valid: true,
            userName: user.name,
            userEmail: user.email,
            role: user.role
        });

    } catch (error) {
        console.error("Verify invite token error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}