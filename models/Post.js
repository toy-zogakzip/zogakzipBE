import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    content: {
        //본문
        type: String,
        required: true,
    },
    tags: [{ type: String, required: true }], // 태그 배열
    location: {
        type: String,
        required: true,
    },
    moment: {
        // 추억의 순간
        type: Date,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: true,
    },
    postPassword: {
        //post 비밀번호
        type: String,
        required: true,
    },
    groupId: {
        // 그룹 ID
        type: mongoose.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    //groupPassword 추가 필요
    likeCount: {
        // 공감 수
        type: Number,
        default: 0,
    },
    commentCount: {
        // 댓글 수
        type: Number,
        default: 0,
    },
    createdAt: {
        // 생성일
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", PostSchema); //posts

export default Post;
