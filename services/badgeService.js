import Group from "../models/Group.js";
import Badge from "../models/Badge.js";

export const checkBadgeCategory = async (groupId) => {
    const group = await Group.findById(groupId).populate("posts");

    //배지 획득 조건 검사
    const badgesToGet = [];

    //7일 연속 포스팅
    const continuousSevenPosts = group.posts.filter((post) => {
        const postDate = new Date(post.createdAt);
        const diff = (new Date() - postDate) / (1000 * 3600 * 24); //차이 계산
        return diff;
    });

    if (continuousSevenPosts >= 7) {
        const badge = await Badge.findOne({
            condition: "continuousPosting",
        });
        if (!group.badges.includes(badge.Id)) {
            badgesToGet.puch(badge);
        }
    }

    //20개 이상 추억 등록
    if (group.posts.length >= 20) {
        const badge = await Badge.findOne({
            condition: "postCounting",
        });
        if (!group.badges.includes(badge.Id)) {
            badgesToGet.puch(badge);
        }
    }

    //그룹 생성 1년 달성
    const period = (new Date() - new Date(group.createdAt)) / (1000 * 3600 * 24);
    if (period >= 365) {
        const badge = await Badge.findOne({
            condition: "groupCreating",
        });
        if (!group.badges.includes(badge.Id)) {
            badgesToGet.puch(badge);
        }
    }

    //그룹 공감 1만개 이상
    if (group.likeCount >= 10000) {
        const badge = await Badge.findOne({
            condition: "groupLikes",
        });
        if (!group.badges.includes(badge.Id)) {
            badgesToGet.puch(badge);
        }
    }

    //추억 공감 1만개 이상
    const postLikedOver = group.posts.some((post) => likeCount >= 10000);
    if (postLikedOver) {
        const badge = await Badge.findOne({
            condition: "postLikes",
        });
        if (!group.badges.includes(badge.Id)) {
            badgesToGet.puch(badge);
        }

        //그룹에 뱃지 추가
        if (badgesToGet.length > 0) {
            group.badges.push(...badgesToGet.map((badge) => badge._id));
            await group.save();
        }

        return badgesToGet;
    }
};
