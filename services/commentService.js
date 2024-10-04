import Comment from "../models/Comment.js";

//댓글 등록
export const createCommentService = async (postId, data) => {
    const newComment = new Comment({
        postId,
        nickname: data.nickname,
        content: data.content,
        password: data.password,
    });
    return await newComment.save();
};

//댓글 목록 조회
export const getCommentListService = async ({ postId, page = 1, pageSize = 10 }) => {
    const totalItemCount = await Comment.countDocuments({ postId });
    const comments = await Comment.find({ postId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));
    return {
        currentPage: page,
        totalPages: Math.ceil(totalItemCount / pageSize),
        totalItemCount,
        data: comments.map((comment) => ({
            id: comment.id,
            nickname: comment.nickname,
            content: comment.content,
            createdAt: comment.createdAt,
        })),
    };
};

//댓글 수정
export const updateCommentService = async (commentId, password, updatedData) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.password !== password) throw new Error("Incorrect password");
    comment.nickname = updatedData.nickname;
    comment.content = updatedData.content;
    return await comment.save();
};

//댓글 삭제
export const deleteCommentService = async (commentId, password) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.password !== password) throw new Error("Incorrect password");
    await Comment.findByIdAndDelete(commentId);
};
