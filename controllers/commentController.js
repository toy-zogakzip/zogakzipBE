import { createCommentService, getCommentListService, updateCommentService, deleteCommentService } from "../services/commentService.js";

//댓글 등록
export const createComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { nickname, content, password } = req.body;
        const comment = await createCommentService(postId, {
            nickname,
            content,
            password,
        });
        const response = {
            id: comment._id,
            nickname: comment.nickname,
            content: comment.content,
            createdAt: comment.createdAt,
        };
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: "잘못된 요청입니다" });
    }
};

//댓글 목록 조회
export const getCommentList = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { page, pageSize } = req.query;
        const commentList = await getCommentListService({
            postId,
            page,
            pageSize,
        });
        res.status(201).json(commentList);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "잘못된 요청입니다" });
    }
};

//댓글 수정
export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { nickname, content, password, createdAt } = req.body;
        const updatedComment = await updateCommentService(commentId, password, {
            nickname,
            content,
            createdAt,
        });
        const response = {
            id: updatedComment._id,
            nickname: updatedComment.nickname,
            content: updatedComment.content,
            createdAt: updatedComment.createdAt,
        };
        res.status(200).json(response);
    } catch (error) {
        if (error.message === "Incorrect password") {
            res.status(403).json({ message: "비밀번호가 틀렸습니다" });
        } else if (error.message === "Comment not found") {
            res.status(404).json({ message: "존재하지 않습니다" });
        } else {
            res.status(400).json({ message: "잘못된 요청입니다" });
        }
    }
};

//댓글 삭제
export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { password } = req.body;
        await deleteCommentService(commentId, password);
        res.status(200).json({ message: "답글 삭제 성공" });
    } catch (error) {
        console.error("delete - Error:", error.message); // 오류 메시지 출력
        if (error.message === "Incorrect password") {
            res.status(403).json({ message: "비밀번호가 틀렸습니다" });
        } else if (error.message === "Comment not found") {
            res.status(404).json({ message: "존재하지 않습니다" });
        } else {
            res.status(400).json({ message: "잘못된 요청입니다" });
        }
    }
};
