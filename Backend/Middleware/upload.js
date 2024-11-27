const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // โฟลเดอร์ที่เก็บรูปภาพ
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname); // ตั้งชื่อไฟล์ใหม่
    },
});
  
exports.upload = multer({storage:storage}).single('image');