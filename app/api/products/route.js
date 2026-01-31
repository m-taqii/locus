import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
    try {
        await connectDb();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const isOwner = session.user.role === "Owner"
        const userId = isOwner ? session.user.id : session.user.businessId;

        const products = await Product.find({ owner: userId });
        return NextResponse.json({ products, message: "Products fetched successfully" });
    } catch (error) {
        console.error("Get products error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500, message: "Failed to fetch products" });
    }
}

export async function POST(request) {
    try {
        await connectDb();
        const { name, price, quantity, minThreshold, sku, category, status } = await request.json();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const isOwner = session.user.role === "Owner"
        const userId = isOwner ? session.user.id : session.user.businessId;

        if (session.user.role !== "Admin" && !isOwner) {
            return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 });
        }

        const newProduct = await Product.create({ name, price, quantity, minThreshold, sku, category, status, owner: userId });
        return NextResponse.json(newProduct, { message: "Product created successfully", status: 201 });
    } catch (error) {
        console.error("Create product error:", error);
        return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500, message: "Failed to create product" });
    }
}
