import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import groupRoutes from "./routes/groupRoute.js";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors()); //cors 설정
app.use(express.json()); //json 데이터 파싱 미들웨어 추가

//라우트 정의
app.get("/", (req, res) => {
    res.send("hello");
});

// 라우트 설정
app.use("/api", groupRoutes); // 그룹 관련 API

mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
