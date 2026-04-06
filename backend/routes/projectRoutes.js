const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getProjects,
  addProject,
  uploadFile,
  deleteFile,
  getAuthUrl,
  handleAuthCallback
} = require("../controllers/projectController");

router.get("/", getProjects);

router.post("/", addProject);

// File upload endpoint - handles image/file upload to Google Drive
router.post("/upload", upload.single("file"), uploadFile);

// Delete file from Google Drive
router.delete("/file/:fileId", deleteFile);

// OAuth2 authentication endpoints
router.get("/auth/url", getAuthUrl);
router.get("/auth/callback", handleAuthCallback);

module.exports = router;