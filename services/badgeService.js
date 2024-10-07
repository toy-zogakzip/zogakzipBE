import Group from "../models/Group.js";
import Badge from "../models/Badge.js";
import Post from "../models/Post.js";

export const checkAndGetBadges = async (groupId) => {
    const group = await Group.findById(groupId).populate("badges");
    if (!group) {
        console.log("groupId not found");
    }

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
    const twentyPostsOver = await Badge.findOne({ name: "추억 20개 등록" });
    if (twentyPostsOver && !group.badges.some((badge) => badge.name === "추억 20개 등록")) {
        const postCount = await Post.countDocuments({ groupId });
        if (postCount >= 20) {
            group.badges.push(twentyPostsOver._id);
            console.log(`Badge ${twentyPostsOver.name} added to group ${groupId}`);
        }
    }

    //그룹 생성 1년 달성
    const YearOver = await Badge.findOne({ name: "1주년 기념" });
    if (YearOver && !group.badges.some((badge) => badge.name === "1주년 기념")) {
        const YearDate = new Date(group.createdAt.getTime() + 365 * 24 * 60 * 60 * 1000); // 1년 후 날짜 계산
        if (new Date() >= YearDate) {
            group.badges.push(YearOver._id);
            console.log(`Badge ${YearOver.name} added to group ${groupId}`);
        }
    }

    //그룹 공감 1만개 이상
    const groupLikesOver = await Badge.findOne({
        name: "1만 그룹 공감",
    });
    if (groupLikesOver && !group.badges.some((badge) => badge.name === "1만 그룹 공감")) {
        if (group.likeCount >= 10000) {
            // likeCount가 10,000 이상인지 확인
            group.badges.push(groupLikesOver._id);
            console.log(`Badge ${groupLikesOver.name} added to group ${groupId}`);
        }
    }

    //추억 공감 1만개 이상
    const postLikesOver = await Badge.findOne({
        name: "1만 추억 공감",
    });
    // 배지가 이미 추가되지 않았는지 확인하고, likeCount가 10,000 이상인 게시글이 있는지 확인
    if (postLikesOver && !group.badges.some((badgeId) => badgeId.toString() === postLikesOver._id.toString())) {
        // 해당 그룹의 게시글 중 likeCount가 10,000 이상인 게시글이 하나라도 있는지 확인
        const postsWithLikes = await Post.find({
            groupId,
            likeCount: { $gte: 10000 }, // likeCount가 10,000 이상인 게시글 찾기
        });
        console.log(`Found ${postsWithLikes.length} posts with 10,000+ likes`);

        if (postsWithLikes.length > 0) {
            group.badges.push(postLikesOver._id); // 배지 추가
            console.log(`Badge ${postLikesOver.name} added to group ${groupId}`);
        }
    }

    await group.save();
};
