import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: true,
    },
    introduction: {
        type: String,
        required: true,
    },
    badges: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Badge",
            default: [],
        },
    ],

    likeCount: {
        type: Number,
        default: 0,
    },
    badgeCount: {
        type: Number,
        default: 0,
    },
    postCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Group = mongoose.model("Group", GroupSchema); //groups 컬렉션의 db

export default Group;
