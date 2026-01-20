import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
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
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
    },
    role:{
        type: String,
        enum: ["admin", "staff"],
        default: "admin"
    }
},{timestamps: true});

export default mongoose.models.User || mongoose.model("User", UserSchema);