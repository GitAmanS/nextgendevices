const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
fs.ensureDirSync(uploadDir);

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
