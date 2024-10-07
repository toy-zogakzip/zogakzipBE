import express from "express";
import { uploadImage } from "../controllers/imageController.js";
import multer from "multer";

//이미지 파일 저장
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type - only jpeg and png can be uploaded"), false);
    }
};
const upload = multer({ storage, imageFilter });

const router = express.Router();
router.post("/image", upload.single("image"), uploadImage);

export default router;
