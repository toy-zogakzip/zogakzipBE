import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
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
});
Badge = mongoose.model("Badge", badgeSchema);
export default Badge;
