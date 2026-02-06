import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import stockLogs from "@/models/stockLogs.model";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(request) {
    try {
        await connectDb();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Get date range from query params
        const { searchParams } = new URL(request.url);
        const dateRange = searchParams.get('range') || '30days';

        // Calculate date filter based on range
        const now = new Date();
        let startDate;
        switch (dateRange) {
            case '7days':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30days':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '90days':
                startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }

        // Get business ID based on user role
        const isOwner = session.user.role === "Owner";
        const businessId = isOwner
            ? new mongoose.Types.ObjectId(session.user.id)
            : new mongoose.Types.ObjectId(session.user.businessId);

        // 1. Sales trend data (for Line Chart)
        const salesTrend = await stockLogs.aggregate([
            {
                $match: {
                    businessId: businessId,
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: dateRange === '7days' ? "%Y-%m-%d" : "%Y-%U",
                            date: "$createdAt"
                        }
                    },
                    sales: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "stock-out"] }, "$quantity", 0]
                        }
                    },
                    returns: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "stock-in"] }, "$quantity", 0]
                        }
                    }
                }
            },
            { $sort: { _id: 1 } },
            { $limit: 12 }
        ]);

        // Format sales trend for chart
        const salesTrendData = salesTrend.map((item, index) => ({
            name: dateRange === '7days'
                ? new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' })
                : `Week ${index + 1}`,
            sales: item.sales,
            returns: item.returns
        }));

        // 2. TOP PRODUCTS DATA (for Bar Chart)
        const topProductsData = await Product.find({ owner: businessId })
            .sort({ quantity: -1 })
            .limit(6)
            .lean();

        const productChartData = topProductsData.map(product => ({
            name: product.name.length > 12 ? product.name.substring(0, 12) + '...' : product.name,
            quantity: product.quantity,
            fullName: product.name
        }));

        // 3. INVENTORY HEALTH METRICS
        // Get all products
        const products = await Product.find({ owner: businessId });
        const totalProducts = products.length;

        // Calculate total sales in period
        const totalSalesInPeriod = await stockLogs.aggregate([
            {
                $match: {
                    businessId: businessId,
                    type: "stock-out",
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSold: { $sum: "$quantity" }
                }
            }
        ]);

        const totalSold = totalSalesInPeriod[0]?.totalSold || 0;
        const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

        // Turnover rate (sales / avg inventory)
        const turnoverRate = totalStock > 0 ? ((totalSold / totalStock) * 30 / getDaysDiff(startDate, now)).toFixed(1) : 0;

        // Average days in stock (simplified calculation)
        const avgDaysInStock = totalSold > 0 ? Math.round((totalStock / totalSold) * getDaysDiff(startDate, now)) : 0;

        // 4. DEAD STOCK (No sales in 30+ days)
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Get products that had sales in last 30 days
        const productsWithRecentSales = await stockLogs.distinct('product', {
            businessId: businessId,
            type: "stock-out",
            createdAt: { $gte: thirtyDaysAgo }
        });

        // Find products without recent sales
        const deadStockProducts = await Product.find({
            owner: businessId,
            _id: { $nin: productsWithRecentSales },
            quantity: { $gt: 0 }
        }).limit(5).lean();

        // Calculate days since last sale for dead stock
        const deadStock = await Promise.all(deadStockProducts.map(async (product) => {
            const lastSale = await stockLogs.findOne({
                product: product._id,
                type: "stock-out"
            }).sort({ createdAt: -1 });

            const daysSinceLastSale = lastSale
                ? Math.round((now - lastSale.createdAt) / (24 * 60 * 60 * 1000))
                : 999;

            return {
                name: product.name,
                quantity: product.quantity,
                daysSinceLastSale: daysSinceLastSale > 999 ? 'Never sold' : `${daysSinceLastSale} days`
            };
        }));

        // 5. FAST MOVING STOCK
        const fastMovingProducts = await stockLogs.aggregate([
            {
                $match: {
                    businessId: businessId,
                    type: "stock-out",
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: "$product",
                    totalSold: { $sum: "$quantity" },
                    productName: { $first: "$productName" }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 }
        ]);

        // Calculate velocity (% above average)
        const avgSales = totalSold / Math.max(totalProducts, 1);
        const fastMoving = fastMovingProducts.map(p => ({
            name: p.productName,
            velocity: avgSales > 0 ? `+${Math.round(((p.totalSold / avgSales) - 1) * 100)}%` : '+0%',
            totalSold: p.totalSold
        }));

        // 6. SLOW MOVING STOCK
        // Products with stock but low sales
        const productSales = await stockLogs.aggregate([
            {
                $match: {
                    businessId: businessId,
                    type: "stock-out",
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: "$product",
                    totalSold: { $sum: "$quantity" }
                }
            }
        ]);

        const salesMap = new Map(productSales.map(p => [p._id.toString(), p.totalSold]));

        const slowMovingProducts = products
            .filter(p => p.quantity > 0)
            .map(p => ({
                ...p.toObject(),
                totalSold: salesMap.get(p._id.toString()) || 0
            }))
            .filter(p => p.totalSold < avgSales && p.totalSold > 0)
            .sort((a, b) => a.totalSold - b.totalSold)
            .slice(0, 5)
            .map(p => ({
                name: p.name,
                velocity: avgSales > 0 ? `${Math.round(((p.totalSold / avgSales) - 1) * 100)}%` : '-0%',
                totalSold: p.totalSold
            }));

        // 7. OVERSTOCK (quantity > 3x minThreshold)
        const overstockProducts = products.filter(p => p.quantity > p.minThreshold * 3);

        // 8. HEALTH SCORE CALCULATION
        const deadStockCount = deadStockProducts.length;
        const overstockCount = overstockProducts.length;
        const lowStockCount = products.filter(p => p.quantity <= p.minThreshold).length;

        // Health score formula (100 - penalties)
        let healthScore = 100;
        healthScore -= (deadStockCount * 5); // -5 per dead stock item
        healthScore -= (overstockCount * 3); // -3 per overstock item
        healthScore -= (lowStockCount * 4);  // -4 per low stock item
        healthScore = Math.max(0, Math.min(100, healthScore)); // Clamp 0-100

        // RESPONSE
        return NextResponse.json({
            salesTrendData,
            productChartData,
            inventoryHealth: {
                turnoverRate: parseFloat(turnoverRate),
                avgDaysInStock: avgDaysInStock > 365 ? 365 : avgDaysInStock,
                deadStockCount,
                overstockCount,
                healthScore: Math.round(healthScore)
            },
            deadStock,
            fastMoving,
            slowMoving: slowMovingProducts,
            summary: {
                totalProducts,
                totalStock,
                totalSold,
                lowStockCount
            }
        });

    } catch (error) {
        console.error("Insights API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Helper function to calculate days difference
function getDaysDiff(startDate, endDate) {
    return Math.max(1, Math.round((endDate - startDate) / (24 * 60 * 60 * 1000)));
}
