import { NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
export async function DELETE(request, context) {
    const session = await getServerSession(authOptions)
    const { id } = await context.params

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    if (session.user.role !== "Admin" && session.user.role !== "Owner") {
        return NextResponse.json({ message: "Unauthorized - Admin access required" }, { status: 401 })
    }

    try {
        await connectDb()

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId format:", id)
            return NextResponse.json({ message: "Invalid product ID format" }, { status: 400 })
        }

        const product = await User.findByIdAndDelete(id)

        if (!product) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
    } catch (error) {

        console.error("Delete user error:", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}

export async function PATCH(request, context) {
    const session = await getServerSession(authOptions)
    const { id } = await context.params

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    if (session.user.role !== "Admin" && session.user.role !== "Owner") {
        return NextResponse.json({ message: "Unauthorized - Admin access required" }, { status: 401 })
    }

    try {
        await connectDb()

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId format:", id)
            return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 })
        }

        const body = await request.json()
        const existUser = await User.findOne({ email: body.email })

        if (existUser && existUser._id.toString() !== id) {
            return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
        }

        // If password is empty or not provided, remove it from the update
        if (!body.password || body.password.trim() === '') {
            delete body.password
        } else {
            // If password is provided, hash it before updating
            body.password = await bcrypt.hash(body.password, 10)
        }

        const user = await User.findByIdAndUpdate(id, body, { new: true })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "User updated successfully", user }, { status: 200 })
    } catch (error) {

        console.error("Update user error:", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}