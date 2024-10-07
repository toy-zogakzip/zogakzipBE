import Post from "../models/Post.js";
import mongoose from "mongoose";

//게시글 등록
export const createPostService = async (data) => {
    const newPost = new Post({
        groupId: data.groupId,
        nickname: data.nickname,
        title: data.title,
        content: data.content,
        postPassword: data.postPassword,
        imageUrl: data.imageUrl,
        tags: data.tags,
        location: data.location,
        moment: data.moment,
        isPublic: data.isPublic,
        createdAt: new Date(),
    });
    return await newPost.save();
};

//게시글 목록 조회

export const getPostListService = async ({ groupId, page = 1, pageSize = 10, sortBy = "latest", keyword = "", isPublic }) => {
    const sortOptions = {
        latest: { createdAt: -1 },
        mostCommented: { commentCount: -1 },
        mostLiked: { likeCount: -1 },
    };
    //groupId 비교
    const filter = {
        groupId: groupId, // ObjectId 대신 문자열로 비교
        ...(isPublic !== undefined && { isPublic: isPublic === "true" }), // Boolean 값으로 처리
        ...(keyword && { tags: { $regex: keyword, $options: "i" } }), // tags 필드에 keyword 포함 필터
    };
    console.log("필터", filter);

    const totalItemCount = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
        .sort(sortOptions[sortBy])
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));

    console.log("posts: ", posts); //result 확인
    const totalPages = Math.ceil(totalItemCount / pageSize);

    return {
        currentPage: parseInt(page),
        totalPages,
        totalItemCount,
        data: posts.map((post) => ({
            id: post.id,
            nickname: post.nickname,
            title: post.title,
            imageUrl: post.imageUrl,
            tags: post.tags,
            location: post.location,
            moment: post.moment,
            isPublic: post.isPublic,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
            createdAt: post.createdAt,
        })),
    };
};

//게시글 수정
export const updatePostService = async (postId, password, updatedData) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    if (post.postPassword !== password) throw new Error("Incorrect password");
    post.nickname = updatedData.nickname;
    post.title = updatedData.title;
    post.content = updatedData.content;
    post.imageUrl = updatedData.imageUrl;
    post.tags = updatedData.tags;
    post.location = updatedData.location;
    post.moment = updatedData.moment;
    post.isPublic = updatedData.isPublic;
    return await post.save();
};

//게시글 삭제
export const deletePostService = async (postId, password) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found"); // 게시글 없으면 에러 처리
    if (post.postPassword !== password) throw new Error("Incorrect password"); // 비밀번호가 일치X 처리
    await Post.findByIdAndDelete(postId);
};

//게시글 상세 정보 조회
export const getPostDetailService = async (postId) => {
    // find post
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("post not found");
    }
    return {
        id: post._id,
        groupId: post.groupId,
        nickname: post.nickname,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        tags: post.tags,
        location: post.location,
        moment: post.moment,
        isPublic: post.isPublic,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
    };
};

//게시글 조회 권한 확인
export const verifyPostPasswordService = async (postId, password) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    if (post.postPassword !== password) throw new Error("Incorrect password");
};

//게시글 공감하기
export const likePostService = async (postId) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    post.likeCount += 1;
    return await post.save();
};

//게시글 공개 여부 확인
export const checkPostPublicService = async (postId) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");
    return {
        id: post._id,
        isPublic: post.isPublic,
    };
};
