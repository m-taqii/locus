import { NextResponse } from "next/server";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt"
import User from "@/models/user.model";
import Business from "@/models/business.model";
import Product from "@/models/product.model";
import StockLogs from "@/models/stockLogs.model";
import AccountDeletion from "@/models/accountDeletion.model";
import mongoose from "mongoose";

export async function POST(req) {
    const mongoSession = await mongoose.startSession()
    mongoSession.startTransaction()

    try {
        await connectDb()
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        if (session.user.role !== "Owner") {
            return NextResponse.json({ message: "You are not authorized to delete this account" }, { status: 403 })
        }

        const { password, reason, additionalFeedback } = await req.json()

        if (!password) {
            return NextResponse.json({ message: "Password is required" }, { status: 400 })
        }

        if (!reason) {
            return NextResponse.json({ message: "Please select a reason for deletion" }, { status: 400 })
        }

        const business = await Business.findById(session.user.id).select("+password").session(mongoSession)
        if (!business) {
            return NextResponse.json({ message: "Business not found" }, { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, business.password)
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 })
        }

        // Get IP address
        const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''

        // Save deletion record
        await AccountDeletion.create([{
            businessId: session.user.id,
            ownerName: business.ownerName,
            ipAddress,
            reason,
            feedback: additionalFeedback || ""
        }], { session: mongoSession })

        // Convert to ObjectId for proper matching
        const businessObjectId = new mongoose.Types.ObjectId(session.user.id)

        // Delete all user data
        await Business.findByIdAndDelete(session.user.id, { session: mongoSession })
        await User.deleteMany({ business: businessObjectId }, { session: mongoSession })
        await Product.deleteMany({ owner: businessObjectId }, { session: mongoSession })
        await StockLogs.deleteMany({ businessId: businessObjectId }, { session: mongoSession })

        await mongoSession.commitTransaction()

        return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 })

    } catch (error) {
        console.error("Error deleting account:", error)
        await mongoSession.abortTransaction()
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    } finally {
        mongoSession.endSession()
    }
}