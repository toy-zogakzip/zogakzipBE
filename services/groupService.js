import Group from "../models/Group.js";
import mongoose from "mongoose";

//그룹 등록
export const createGroupService = async (data) => {
    const newGroup = new Group({
        name: data.name,
        password: data.password,
        imageUrl: data.imageUrl,
        isPublic: data.isPublic,
        introduction: data.introduction,
        likeCount: 0,
        badges: [],
        badgeCount: 0,
        postCount: 0,
        createdAt: new Date(),
    });
    return await newGroup.save();
};

//그룹 목록 조회
export const getGroupListService = async ({ page = 1, pageSize = 10, sortBy = "latest", keyword = "", isPublic }) => {
    const filter = {
        ...(isPublic && { isPublic: isPublic === "true" }), // 공개 여부 필터
        ...(keyword && { name: new RegExp(keyword, "i") }), // 검색어 필터
    };
    const sortOptions = {
        latest: { createdAt: -1 },
        mostPosted: { postCount: -1 },
        mostLiked: { likeCount: -1 },
        mostBadge: { badgeCount: -1 },
    };
    const totalItemCount = await Group.countDocuments(filter);
    const groups = await Group.find(filter)
        .sort(sortOptions[sortBy])
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));
    return {
        currentPage: page,
        totalPages: Math.ceil(totalItemCount / pageSize),
        totalItemCount,
        data: groups.map((group) => ({
            id: group.id,
            name: group.name,
            imageUrl: group.imageUrl,
            isPublic: group.isPublic,
            likeCount: group.likeCount,
            badgeCount: group.badgeCount,
            postCount: group.postCount,
            createdAt: group.createdAt,
            introduction: group.introduction,
        })),
    };
};

//그룹 수정
export const updateGroupService = async (groupId, password, updatedData) => {
    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group not found");
    if (group.password !== password) throw new Error("Incorrect password");
    group.name = updatedData.name;
    group.imageUrl = updatedData.imageUrl;
    group.isPublic = updatedData.isPublic;
    group.introduction = updatedData.introduction;
    return await group.save();
};

//그룹 삭제
export const deleteGroupService = async (groupId, password) => {
    // groupId가 ObjectId 형식인지 확인
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        throw new Error("Group not found"); // 유효하지 않은 ID 형식일 경우 404 처리
    }
    // groupId를 ObjectId로 변환하여 그룹 검색
    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group not found"); // 그룹이 없으면 404 처리
    if (group.password !== password) throw new Error("Incorrect password"); // 비밀번호가 일치하지 않으면 403 처리
    //group 삭제
    await Group.findByIdAndDelete(groupId);
};

//그룹 상세 정보 조회
export const getGroupDetailService = async (groupId) => {
    // 그룹을 찾습니다.
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error("Group not found"); // 그룹이 없으면 404로 보낼 수 있도록 에러 발생
    }
    // 그룹이 존재할 경우, 데이터 반환 (배지 목록은 예시로 제공, 실제로는 DB와 연동해야 함)
    return {
        id: group._id, // MongoDB의 ObjectId 또는 직접 구현한 숫자 기반 ID
        name: group.name,
        imageUrl: group.imageUrl,
        isPublic: group.isPublic,
        likeCount: group.likeCount,
        badges: ["badge1", "badge2"], // 실제 배지 데이터 연동 필요
        postCount: group.postCount,
        createdAt: group.createdAt,
        introduction: group.introduction,
    };
};

//그룹 조회 권한 확인
export const verifyPasswordService = async (groupId, password) => {
    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group not found");
    if (group.password !== password) throw new Error("Incorrect password");
};

//그룹 공감하기
export const likeGroupService = async (groupId) => {
    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group not found");
    group.likeCount += 1;
    return await group.save();
};

//그룹 공개 여부 확인
export const checkPublicService = async (groupId) => {
    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group not found");
    return {
        id: group._id,
        isPublic: group.isPublic,
    };
};
