# 조각집

## 기억 저장 및 공유 서비스

### 코드잇 부스트 덕성여대 1기 파워부스트 토이프로젝트 [조각집] 4팀 백엔드 레포입니다.

## 주요 기능

-   **그룹 생성 및 관리**: 그룹 생성 및 조회, 수정, 삭제 가능/ 그룹 공개 여부 설정 가능
-   **게시글 작성 및 관리**: 게시글 작성 및 조회, 수정, 삭제 가능
-   **댓글 작성 및 관리**: 댓글 작성 및 조회, 수정, 삭제 가능
-   **배지 시스템**: 일정 조건 달성 시 자동으로 배지 획득

## 기술 스택

-   Node.js, Express.js, MongoDB


project/  
│  
├── models/              # 데이터베이스 스키마 정의  
│   ├── Badge.js         # 배지 관련 데이터 모델  
│   ├── Comment.js       # 댓글 관련 데이터 모델  
│   ├── Group.js         # 그룹 관련 데이터 모델  
│   └── Post.js          # 게시글 관련 데이터 모델  
│  
├── controllers/               # API 로직 구현  
│   ├── commentController.js   # 댓글 관련 API 로직  
│   ├── groupController.js     # 그룹 관련 API 로직  
│   ├── imageController.js     # 이미지 관련 API 로직  
│   └── postController.js      # 게시글 관련 API 로직  
│  
├── routes/              # 라우터 설정  
│   ├── commentRoute.js  # 댓글 관련 라우터  
│   ├── groupRoute.js    # 그룹 관련 라우터  
│   ├── imageRoute.js     # 이미지 관련 라우터  
│   └── postRoute.js    # 게시글 관련 라우터  
│  
├── services/            # 기능 설정  
│   ├── badgeService.js    # 배지 관련 라우터  
│   ├── commentService.js     # 댓글 관련 라우터  
│   ├── groupService.js    # 그룹 관련 라우터  
│   ├── postService.js  # 게시글 관련 라우터  
│  
├── uploads/            # 이미지 파일 업로드 폴더  
├── .env                 # 환경 변수 설정 파일  
├── app.js               # Express 서버 설정 및 라우터 연결  
├── package.json         # 프로젝트 설정 및 종속성 관리 파일  
└── README.md            # 프로젝트 설명 파일  
