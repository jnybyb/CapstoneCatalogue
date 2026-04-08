const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getProjects,
  addProject,
  uploadFile,
  deleteFile,
  deleteProject,
  getAuthUrl,
  handleAuthCallback,
  getImageProxy
} = require("../controllers/projectController");

router.get("/", getProjects);

router.post("/", addProject);

// More specific routes FIRST (file operations)
router.post("/upload", upload.single("file"), uploadFile);

router.delete("/file/:fileId", deleteFile);

router.get("/image/:fileId", getImageProxy);

// Less specific routes AFTER
router.delete("/:projectId", deleteProject);

// OAuth2 authentication endpoints
router.get("/auth/url", getAuthUrl);
router.get("/auth/callback", handleAuthCallback);

module.exports = router;