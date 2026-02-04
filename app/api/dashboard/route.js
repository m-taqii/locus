import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import stockLogs from "@/models/stockLogs.model";
import User from "@/models/user.model";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export const GET = async () => {
    try {
        await connectDb()
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        let businessId;
        if (session.user.role === "Owner") {
            businessId = session.user.id
        } else {
            businessId = session.user.businessId
        }

        // Convert businessId string to ObjectId for aggregate queries
        const businessObjectId = new mongoose.Types.ObjectId(businessId);

        if (session.user.role === "Admin" || session.user.role === "Owner") {

            const [productsCount, users, totalSoldResult, lowStockProducts, topSellingStaffResult, topSellingProductsResult] = await Promise.all([
                Product.countDocuments({ owner: businessId, status: 'active' }),
                User.countDocuments({ business: businessId, status: 'active' }),

                stockLogs.aggregate([
                    { $match: { businessId: businessObjectId, type: "stock-out" } },
                    { $group: { _id: null, totalSold: { $sum: "$quantity" } } }
                ]),

                Product.find({
                    owner: businessId,
                    status: "active",
                    $expr: { $lte: ["$quantity", "$minThreshold"] }
                }),

                stockLogs.aggregate([
                    { $match: { businessId: businessObjectId, type: "stock-out", userId: { $ne: null } } },
                    { $group: { _id: "$userId", totalSold: { $sum: "$quantity" } } },
                    { $sort: { totalSold: -1 } },
                    { $limit: 3 },
                    {
                        $lookup: {
                            from: "users",            // collection name (plural!)
                            localField: "_id",         // userId from group
                            foreignField: "_id",       // _id in users collection
                            as: "user"
                        }
                    },
                    { $unwind: "$user" },            // convert array → object
                    { $project: { _id: 0, userId: "$user._id", name: "$user.name", email: "$user.email", role: "$user.role", totalSold: 1 } }
                ]),

                // Top Selling Products:
                // 1. Find all stock-out logs for this business
                // 2. Group by product and sum the quantities sold
                // 3. Sort by total sold (highest first)
                // 4. Get top 5 products
                // 5. Look up product details (name, category, price)
                stockLogs.aggregate([
                    { $match: { businessId: businessObjectId, type: "stock-out" } },
                    { $group: { _id: "$product", totalSold: { $sum: "$quantity" } } },
                    { $sort: { totalSold: -1 } },
                    { $limit: 5 },
                    {
                        $lookup: {
                            from: "products",
                            localField: "_id",
                            foreignField: "_id",
                            as: "product"
                        }
                    },
                    { $unwind: "$product" },
                    { $project: { _id: "$product._id", name: "$product.name", category: "$product.category", price: "$product.price", totalSold: 1 } }
                ])
            ])
            const totalSold = totalSoldResult[0]?.totalSold || 0;

            return NextResponse.json({ productsCount, users, totalSold, topSellingStaff: topSellingStaffResult, lowStockProducts, topSellingProducts: topSellingProductsResult })
        } else {
            // Convert userId to ObjectId for aggregate query
            const userObjectId = new mongoose.Types.ObjectId(session.user.id);

            const [productsCount, totalSoldResult, lowStockProducts, topSellingProductsResult] = await Promise.all([
                Product.countDocuments({
                    owner: businessId,
                    status: 'active'
                }),
                stockLogs.aggregate([
                    { $match: { userId: userObjectId, type: "stock-out" } },
                    { $group: { _id: null, totalSold: { $sum: "$quantity" } } }
                ]),
                Product.find({
                    owner: businessId,
                    status: "active",
                    $expr: { $lte: ["$quantity", "$minThreshold"] }
                }),

                // Top Selling Products for Staff
                stockLogs.aggregate([
                    { $match: { businessId: businessObjectId, type: "stock-out" } },
                    { $group: { _id: "$product", totalSold: { $sum: "$quantity" } } },
                    { $sort: { totalSold: -1 } },
                    { $limit: 5 },
                    {
                        $lookup: {
                            from: "products",
                            localField: "_id",
                            foreignField: "_id",
                            as: "product"
                        }
                    },
                    { $unwind: "$product" },
                    { $project: { _id: "$product._id", name: "$product.name", category: "$product.category", price: "$product.price", totalSold: 1 } }
                ])
            ])

            const totalSold = totalSoldResult[0]?.totalSold || 0;
            return NextResponse.json({ productsCount, totalSold, lowStockProducts, topSellingProducts: topSellingProductsResult })
        }
    } catch (error) {
        console.error('Dashboard GET error:', error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
