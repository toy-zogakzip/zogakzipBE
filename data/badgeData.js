const badges = [
    {
        name: "7일 연속 추억 등록",
        introduction: "7일 연속으로 추억을 등록한 경우 획득",
        condition: "continuousPosting",
        achievementValue: 7,
    },
    {
        name: "추억 수 20개 이상 등록",
        introduction: "20개 이상의 추억을 등록한 경우 획득",
        condition: "postCounting",
        achievementValue: 20,
    },
    {
        name: "그룹 생성 후 1년 달성",
        introduction: "그룹 생성 후 1년이 지난 경우 획득",
        condition: "groupCreating",
        achievementValue: 365,
    },
    {
        name: "그룹 공감 1만 개 이상 받기",
        introduction: "1만 개 이상의 공감을 받은 경우 획득",
        condition: "groupLikes",
        achievementValue: 10000,
    },
    {
        name: "추억 공감 1만 개 이상 받기",
        introduction: "공감 1만 개 이상 받는 경우 획득",
        condition: "postLikes",
        achievementValue: 10000,
    },
];
export default badges;
