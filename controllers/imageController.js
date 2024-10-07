export const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            //이미지 파일 업로드 x
            return res.status(400).json({ message: "이미지 파일을 업로드해주세요" });
        }
        //이미지 url
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: "이미지 업로드 실패" });
    }
};
