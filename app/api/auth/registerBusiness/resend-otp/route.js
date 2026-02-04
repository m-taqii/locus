import { sendEmail } from "@/app/lib/services/email";
import { getOTPEmailTemplate } from "@/app/lib/emailTemplates";
import Business from "@/models/business.model";
import connectDB from "@/app/lib/db";

export async function POST(req) {
    try {
        await connectDB();
        const { id } = await req.json();

        const business = await Business.findOne({ _id: id });
        if (!business) return Response.json({ error: "User not found" }, { status: 404 });

        // Rate limit - wait 60 seconds between OTP requests
        if (business.lastOtpSentAt && Date.now() - business.lastOtpSentAt < 60_000) {
            return Response.json({ error: "Please wait before resending OTP" }, { status: 429 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        business.otpCode = otp;
        business.otpExpiry = Date.now() + 10 * 60 * 1000;
        business.lastOtpSentAt = Date.now();
        await business.save();

        await sendEmail({
            to: business.email,
            subject: "Your New Verification Code - Locus",
            html: getOTPEmailTemplate(business.ownerName, otp),
        });

        return Response.json({ message: "OTP resent successfully", ok: true });
    } catch (error) {
        console.error("Resend OTP error:", error);
        return Response.json({ error: error.message || "Failed to resend OTP" }, { status: 500 });
    }
}
