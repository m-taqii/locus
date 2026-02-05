import mongoose from "mongoose";

const accountDeletionSchema = new mongoose.Schema({
    // Basic identification (for reference if needed)
    businessId: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        default: ""
    },

    // Churn tracking
    reason: {
        type: String,
        enum: ["no_longer_needed", "switching_service", "too_expensive", "missing_features", "other"],
        required: true
    },
    feedback: {
        type: String,
        default: ""
    },

    // When
    deletedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.AccountDeletion || mongoose.model("AccountDeletion", accountDeletionSchema)