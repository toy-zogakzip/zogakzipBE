import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {
        // postId - reference
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Comment = mongoose.model("Comment", CommentSchema); //comments db 연결
export default Comment;
