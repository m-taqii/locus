import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import mongoose from "mongoose";

export async function DELETE(request, context) {
    const session = await getServerSession(authOptions)
    const { id } = await context.params  

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    if (session.user.role !== "Admin" && session.user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized - Admin access required" }, { status: 401 })
    }

    try {
        await connectDb()

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId format:", id)
            return NextResponse.json({ message: "Invalid product ID format" }, { status: 400 })
        }

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Delete product error:", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}


export async function PATCH(request, context){
    const session = await getServerSession(authOptions)
    const { id } = await context.params
    if(!session){
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    if(session.user.role !=="Admin" && session.user.role !=="admin"){
        return NextResponse.json({message: "Unauthorized - Admin access required"}, {status: 401})
    }
    try {
        await connectDb()
        const body = await request.json()
        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId format:", id)
            return NextResponse.json({ message: "Invalid product ID format" }, { status: 400 })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {new: true})
        return NextResponse.json(updatedProduct, {message: "Product updated successfully"}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error", error: error.message}, {status: 500})
    }
}