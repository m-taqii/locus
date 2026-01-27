import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import stockLogs from "@/models/stockLogs.model";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST - Create new stock adjustment
export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    let businessId;
    let userId;
    if (session.user.role == "Staff" || session.user.role == "Admin") {
        businessId = session.user.businessId;
        userId = session.user.id;
    } else if (session.user.role == "Owner") {
        businessId = session.user.id;
        userId = session.user.id;
    }

    console.log("User role:", session.user.role, "Business ID:", businessId, "User ID:", userId);

    try {
        await connectDb();

        const { productId, quantity, type, reason } = await request.json();
        console.log(productId, quantity, type, reason);

        if (!productId || !quantity || !type) {
            return NextResponse.json(
                { message: "Product ID, quantity, and type are required" },
                { status: 400 }
            );
        }

        if (quantity <= 0) {
            return NextResponse.json(
                { message: "Quantity must be greater than 0" },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        let newQuantity;
        if (type === 'stock-in') {
            newQuantity = product.quantity + quantity;
        } else if (type === 'stock-out') {
            newQuantity = product.quantity - quantity;

            if (newQuantity < 0) {
                return NextResponse.json(
                    { message: `Insufficient stock. Current quantity: ${product.quantity}` },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                { message: "Invalid adjustment type. Use 'stock-in' or 'stock-out'" },
                { status: 400 }
            );
        }

        const adjustment = await stockLogs.create({
            userId: userId,
            bussinessId: businessId,
            product: productId,
            productName: product.name,
            quantity,
            type,
            reason: reason || `${type === 'stock-in' ? 'Stock In' : 'Stock Out'} adjustment`,
            previousQuantity: product.quantity,
            newQuantity
        });

        product.quantity = newQuantity;
        await product.save();

        return NextResponse.json(
            {
                message: `Stock ${type === 'stock-in' ? 'added' : 'removed'} successfully`,
                adjustment,
                product
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Stock adjustment error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDb();
        const userId = session.user.id;

        const adjustments = await stockLogs.find({ userId: userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('product', 'name sku');

        return NextResponse.json({ adjustments }, { status: 200 });
    } catch (error) {
        console.error("Fetch stock adjustments error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
