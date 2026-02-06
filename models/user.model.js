import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [6, "Email must be at least 6 characters long"],
        maxLength: [320, "Email must be at most 320 characters long"],
    },
    password: {
        type: String,
        minLength: [6, "Password must be at least 6 characters long"],
        default: null,
        select: false
    },
    role:{
        type: String,
        enum: ["Admin", "Staff"],
        default: "Staff"
    },
    inviteToken:{
        type: String,
        default: null,
        select: false,
    },
    inviteTokenExpires:{
        type: Date,
        default: null,
        select: false,
    },
    status:{
        type: String,
        enum: ["pending", "active", "inactive"],
        default: "pending"
    },
    resetPasswordToken: {
        type: String,
        default: null,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        default: null,
        select: false
    }
},{timestamps: true});

export default mongoose.models.User || mongoose.model("User", UserSchema);