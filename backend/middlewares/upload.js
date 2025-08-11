// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads"),
//   filename: (req, file, cb) => {
//     const safeName = file.originalname.replace(/\s+/g, "_");
//     cb(null, Date.now() + "-" + safeName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
//   if (allowed.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only JPG/PNG/WebP images are allowed"));
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// module.exports = upload;


// middlewares/upload.js
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${base}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ok = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype);
  cb(ok ? null : new Error("Only JPG/PNG/WebP/GIF allowed"), ok);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
