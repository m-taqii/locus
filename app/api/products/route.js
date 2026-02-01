import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(request) {
    try {
        await connectDb();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get business ID based on user role
        const isOwner = session.user.role === "Owner"
        const userId = isOwner ? session.user.id : session.user.businessId;

        // Get pagination params from URL (e.g., /api/products?page=1&limit=10)
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;      // Default: page 1
        const limit = parseInt(searchParams.get('limit')) || 10;   // Default: 10 items per page

        // Calculate how many items to skip
        // Page 1: skip 0, Page 2: skip 10, Page 3: skip 20, etc.
        const skip = (page - 1) * limit;

        // Get total count of products (for calculating total pages)
        const totalItems = await Product.countDocuments({ owner: userId });

        // Get paginated products from database
        const products = await Product.find({ owner: userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Newest first

        // Calculate total pages
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({
            products,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage: limit
            },
            message: "Products fetched successfully"
        });
    } catch (error) {
        console.error("Get products error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
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
