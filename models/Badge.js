import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    introduction: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    achievementValue: {
        type: Number,
        required: true,
    },
    badgeUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Badge = mongoose.model("Badge", BadgeSchema);
export default Badge;
