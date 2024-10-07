import { createPostService, getPostListService, updatePostService, deletePostService, getPostDetailService, verifyPostPasswordService, likePostService, checkPostPublicService } from "../services/postService.js";
import { checkBadgeCategory } from "../services/badgeService.js";

//게시글 등록
export const createPost = async (req, res) => {
    try {
        const groupId = req.params.groupId; //url에서 groupId 가져오기
        const { nickname, title, content, postPassword, imageUrl, tags, location, moment, isPublic } = req.body;
        if (!groupId || !nickname || !title || !content || !postPassword) {
            return res.status(400).json({ message: "잘못된 요청입니다" });
        }
        const post = await createPostService({ ...req.body, groupId });

        const response = {
            id: post.id,
            groupId: post.groupId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
            tags: post.tags,
            location: post.location,
            mement: post.moment,
            isPublic: post.isPublic,
            likeCount: post.likeCount || 0,
            commentCount: post.commentCount || 0,
            createdAt: post.createdAt,
        };
        res.status(200).json(response);
    } catch (error) {
        console.error("Error - create post", error.message);
        res.status(400).json({ message: "잘못된 요청입니다" });
    }
};

//게시글 목록 조회
export const getPostList = async (req, res) => {
    try {
        const { page, pageSize, sortBy, keyword, isPublic } = req.query;
        const groupId = req.params.groupId;
        const postList = await getPostListService({
            groupId,
            page,
            pageSize,
            sortBy,
            keyword,
            isPublic,
        });
        res.status(200).json(postList);
    } catch (error) {
        console.error("Error - get postlist", error.message);
        res.status(400).json({ message: "잘못된 요청입니다" });
    }
};

//게시글 수정
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { nickname, title, content, postPassword, imageUrl, tags, location, moment, isPublic } = req.body;

        const updatedPost = await updatePostService(postId, postPassword, {
            nickname,
            title,
            content,
            imageUrl,
            tags,
            location,
            moment,
            isPublic,
        });
        const response = {
            id: updatedPost.id,
            groupId: updatedPost.groupId,
            nickname: updatedPost.nickname,
            title: updatedPost.title,
            content: updatedPost.content,
            imageUrl: updatedPost.imageUrl,
            tags: updatedPost.tags,
            location: updatedPost.location,
            mement: updatedPost.moment,
            isPublic: updatedPost.isPublic,
            likeCount: updatedPost.likeCount,
            commentCount: updatedPost.commentCount,
            createdAt: updatedPost.createdAt,
        };
        res.status(200).json(response);
    } catch (error) {
        if (error.message === "Incorrect password") {
            res.status(403).json({ message: "비밀번호가 틀렸습니다" });
        } else if (error.message === "post not found") {
            res.status(404).json({ message: "존재하지 않습니다" });
        } else {
            res.status(400).json({ message: "잘못된 요청입니다" });
        }
    }
};
//게시글 삭제
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        console.log("Deleting post with ID:", postId); // postId check
        const { postPassword } = req.body;
        if (!postPassword) {
            return res.status(400).json({ message: "비밀번호를 입력해주세요" });
        }
        await deletePostService(postId, postPassword);
        res.status(200).json({ message: "게시글 삭제 성공" });
    } catch (error) {
        console.error("Error:", error.message); // 오류 메시지 출력
        if (error.message === "Incorrect password") {
            res.status(403).json({ message: "비밀번호가 틀렸습니다" });
        } else if (error.message === "Post not found") {
            res.status(404).json({ message: "존재하지 않습니다" });
        } else {
            res.status(400).json({ message: "잘못된 요청입니다" });
        }
    }
};

//게시글 상세 정보 조회
export const getPostDetail = async (req, res) => {
    try {
        const postId = req.params.postId;

        const post = await getPostDetailService(postId);
        const response = {
            id: post.id,
            groupId: post.groupId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
            tags: post.tags,
            location: post.location,
            mement: post.moment,
            isPublic: post.isPublic,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
            createdAt: post.createdAt,
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: "잘못된 요청입니다" });
    }
};

//게시글 조회 권한 확인
export const verifyPostPassword = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { postPassword } = req.body;
        await verifyPostPasswordService(postId, postPassword);
        res.status(200).json({ message: "비밀번호가 확인되었습니다" });
    } catch (error) {
        res.status(401).json({ message: "비밀번호가 틀렸습니다" });
    }
};

//게시글 공감하기
export const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        await likePostService(postId);
        res.status(200).json({ message: "게시글 공감하기 성공" });
    } catch (error) {
        res.status(404).json({ message: "존재하지 않습니다" });
    }
};

//게시글 공개 여부 확인
export const checkPostPublic = async (req, res) => {
    try {
        const postId = req.params.postId;
        const result = await checkPostPublicService(postId);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: "존재하지 않습니다" });
    }
};
