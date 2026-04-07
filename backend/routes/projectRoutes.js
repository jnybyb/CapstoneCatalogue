const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getProjects,
  addProject,
  uploadFile,
  deleteFile,
  getAuthUrl,
  handleAuthCallback,
  getImageProxy
} = require("../controllers/projectController");

router.get("/", getProjects);

router.post("/", addProject);

// File upload endpoint - handles image/file upload to Google Drive
router.post("/upload", upload.single("file"), uploadFile);

// Delete file from Google Drive
router.delete("/file/:fileId", deleteFile);

// Image proxy endpoint - serves images from Google Drive with CORS headers
router.get("/image/:fileId", getImageProxy);

// OAuth2 authentication endpoints
router.get("/auth/url", getAuthUrl);
router.get("/auth/callback", handleAuthCallback);

module.exports = router;