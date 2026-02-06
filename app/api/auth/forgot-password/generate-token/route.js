import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import userModel from "@/models/user.model";
import businessModel from "@/models/business.model";
import crypto from "crypto";
import { sendEmail } from "@/app/lib/services/email";
import { getResetPasswordEmailTemplate } from "@/app/lib/emailTemplates";

export async function POST(req) {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let resetToken;
    let userName;

    const user = await userModel.findOne({ email }).select("+resetPasswordToken +resetPasswordExpires");
    let business
    if (!user) {
        business = await businessModel.findOne({ email }).select("+resetPasswordToken +resetPasswordExpires");
        if (!business) {
            return NextResponse.json({ message: "If an account exists with this email, a reset link has been sent." });
        }

        resetToken = crypto.randomBytes(32).toString("hex");
        business.resetPasswordToken = resetToken;
        business.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        userName = business.ownerName;
        await business.save();
    } else {
        resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        userName = user.name;
        await user.save();
    }


    const resetUrl = `${process.env.APP_URL}/login/reset-password?token=${resetToken}`;

    try {
        await sendEmail({
            to: email,
            subject: "Reset Your Password - Locus",
            html: getResetPasswordEmailTemplate(userName, resetUrl),
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ message: "Reset link sent! Check your email." });
}