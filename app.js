import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import groupRoutes from "./routes/groupRoute.js";
import postRoutes from "./routes/postRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import imageRoutes from "./routes/imageRoute.js";
import * as dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//이미지 저장 폴더 경로 설정
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));

app.use(cors()); //cors 설정
app.use(express.json()); //json 데이터 파싱 미들웨어 추가

//라우트 정의
app.get("/", (req, res) => {
    res.send("hello");
});

// 라우트 설정
app.use("/api", groupRoutes); // 그룹 관련 API
app.use("/api", postRoutes); // 게시글 관련 API
app.use("/api", commentRoutes); // 댓글 관련 API
app.use("/api", imageRoutes); //이미지 관련 API

mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
