const multer = require("multer");
const path = require("path");

// Configure multer for temporary file handling
// Files are stored in memory, not on disk, to be uploaded directly to Google Drive
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allow only image files
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, GIF, WebP, and PDF are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
});

module.exports = upload;
