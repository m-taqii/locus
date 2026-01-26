import mongoose from "mongoose";

const stockLogsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bussinessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bussiness",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["stock-in", "stock-out"],
        required: true
    },
    reason: {
        type: String,
        default: "Stock adjustment"
    },
    previousQuantity: {
        type: Number,
        required: true
    },
    newQuantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default mongoose.models.stockLogs || mongoose.model("stockLogs", stockLogsSchema)