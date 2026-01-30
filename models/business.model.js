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
    industry: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
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
        default: "Owner"
    },
    status: {
        type: String,
        default: "Active"
    },

}, {
    timestamps: true
})

export default mongoose.models.Business || mongoose.model("Business", businessSchema)
