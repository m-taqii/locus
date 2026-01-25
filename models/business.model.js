import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: "Admin"
    },
    status: {
        type: String,
        default: "Active"
    },

}, {
    timestamps: true
})

export default mongoose.models.Business || mongoose.model("Business", businessSchema)
