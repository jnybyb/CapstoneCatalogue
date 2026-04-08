const db = require("../config/db");
const { 
  uploadFileToDrive, 
  deleteFileFromDrive,
  getAuthorizationUrl,
  getTokensFromCode,
  getFileContent,
  getFileMetadata
} = require("../utils/googleDrive");

// Generate book number: Format MONYEAR-INCREMENT (e.g., JUL24-001)
const generateBookNumber = (month, year, callback) => {
  const monthAbbr = month.substring(0, 3).toUpperCase();
  const yearShort = year.substring(2, 4);
  const monthYearCode = monthAbbr + yearShort;

  // Find the latest book number with the same MONYEAR prefix
  const query = `
    SELECT COUNT(*) as count FROM projects 
    WHERE book_number LIKE ?
  `;

  db.query(query, [`${monthYearCode}%`], (err, results) => {
    if (err) {
      callback(null, err);
      return;
    }

    const nextIncrement = results[0].count + 1;
    const bookNumber = `${monthYearCode}-${String(nextIncrement).padStart(3, "0")}`;
    callback(bookNumber, null);
  });
};

// GET all projects
exports.getProjects = (req, res) => {
  const sql = `
    SELECT
      p.id,
      p.book_number AS bookNumber,
      p.title,
      p.month_year AS monthYear,
      p.abstract_link AS abstractLink,
      p.binding_type AS bindingType,
      GROUP_CONCAT(DISTINCT a.name ORDER BY pa.author_order SEPARATOR ', ') AS names,
      MAX(CASE WHEN pf.role = 'Adviser' THEN f.name END) AS adviser,
      GROUP_CONCAT(DISTINCT CASE WHEN pf.role = 'Thesis Coordinator' THEN f.name END SEPARATOR ', ') AS coordinator,
      MAX(CASE WHEN pf.role = 'Program Head' THEN f.name END) AS programHead,
      MAX(CASE WHEN pf.role = 'Dean' THEN f.name END) AS dean,
      MAX(CASE WHEN pf.role = 'Chair Panel' THEN f.name END) AS chairPanel,
      GROUP_CONCAT(DISTINCT CASE WHEN pf.role = 'Panel Member' THEN f.name END SEPARATOR ', ') AS panelMembers,
      STR_TO_DATE(CONCAT('01 ', p.month_year), '%d %M %Y') AS date
    FROM projects p
    LEFT JOIN project_authors pa ON pa.project_id = p.id
    LEFT JOIN authors a ON a.id = pa.author_id
    LEFT JOIN project_faculty pf ON pf.project_id = p.id
    LEFT JOIN faculty f ON f.id = pf.faculty_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// ADD project
exports.addProject = (req, res) => {
  const {
    title,
    month,
    year,
    monthYear,
    abstractLink,
    bindingType,
    authors,
    adviser,
    coordinators,
    panelMembers,
    programHead,
    dean,
  } = req.body;

  // Generate book number
  generateBookNumber(month || monthYear.split(" ")[0], year || monthYear.split(" ")[1], (bookNumber, err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to generate book number" });
    }

    // Insert project
    const projectSql = `
      INSERT INTO projects 
      (book_number, title, month_year, abstract_link, binding_type)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      projectSql,
      [
        bookNumber,
        title,
        monthYear || `${month} ${year}`,
        abstractLink || null,
        bindingType || "Hardbound",
      ],
      (err, projectResult) => {
        if (err) {
          console.error("Error inserting project:", err);
          return res.status(500).json({ error: "Failed to add project" });
        }

        const projectId = projectResult.insertId;
        let completedInserts = 0;
        let totalInserts = 0;
        let hasError = false;

        // Count total inserts needed
        if (authors && authors.length > 0) totalInserts += authors.length;
        if (adviser) totalInserts += 1;
        if (coordinators && coordinators.length > 0) totalInserts += coordinators.length;
        if (panelMembers && panelMembers.length > 0) totalInserts += panelMembers.length;
        if (programHead) totalInserts += 1;
        if (dean) totalInserts += 1;

        // If no faculty/authors, send response immediately
        if (totalInserts === 0) {
          return res.json({
            message: "Project added successfully",
            projectId,
            bookNumber,
          });
        }

        const checkCompletion = () => {
          completedInserts++;
          if (completedInserts === totalInserts && !hasError) {
            res.json({
              message: "Project added successfully",
              projectId,
              bookNumber,
            });
          }
        };

        const handleError = (error) => {
          if (!hasError) {
            hasError = true;
            console.error("Error during insert:", error);
            res.status(500).json({ error: "Failed to save project details" });
          }
        };

        // Insert authors
        if (authors && authors.length > 0) {
          authors.forEach((authorName, index) => {
            if (authorName.trim()) {
              const authorSql = `INSERT INTO authors (name) VALUES (?)`;
              db.query(authorSql, [authorName.trim()], (err, authorResult) => {
                if (err) {
                  handleError(err);
                  return;
                }

                const authorId = authorResult.insertId;
                const linkSql = `INSERT INTO project_authors (project_id, author_id, author_order) VALUES (?, ?, ?)`;
                db.query(linkSql, [projectId, authorId, index + 1], (err) => {
                  if (err) {
                    handleError(err);
                    return;
                  }
                  checkCompletion();
                });
              });
            }
          });
        }

        // Insert adviser
        if (adviser && adviser.trim()) {
          const facultySql = `INSERT INTO faculty (name, role) VALUES (?, ?)`;
          db.query(facultySql, [adviser.trim(), "Adviser"], (err, facultyResult) => {
            if (err) {
              handleError(err);
              return;
            }

            const facultyId = facultyResult.insertId;
            const linkSql = `INSERT INTO project_faculty (project_id, faculty_id, role) VALUES (?, ?, ?)`;
            db.query(linkSql, [projectId, facultyId, "Adviser"], (err) => {
              if (err) {
                handleError(err);
                return;
              }
              checkCompletion();
            });
          });
        }

        // Insert thesis coordinators
        if (coordinators && coordinators.length > 0) {
          coordinators.forEach((coordinatorName) => {
            if (coordinatorName.trim()) {
              const facultySql = `INSERT INTO faculty (name, role) VALUES (?, ?)`;
              db.query(facultySql, [coordinatorName.trim(), "Thesis Coordinator"], (err, facultyResult) => {
                if (err) {
                  handleError(err);
                  return;
                }

                const facultyId = facultyResult.insertId;
                const linkSql = `INSERT INTO project_faculty (project_id, faculty_id, role) VALUES (?, ?, ?)`;
                db.query(linkSql, [projectId, facultyId, "Thesis Coordinator"], (err) => {
                  if (err) {
                    handleError(err);
                    return;
                  }
                  checkCompletion();
                });
              });
            }
          });
        }

        // Insert panel members
        if (panelMembers && panelMembers.length > 0) {
          panelMembers.forEach((memberName, index) => {
            if (memberName.trim()) {
              const role = index === 0 ? "Chair Panel" : "Panel Member";
              const facultySql = `INSERT INTO faculty (name, role) VALUES (?, ?)`;
              db.query(facultySql, [memberName.trim(), role], (err, facultyResult) => {
                if (err) {
                  handleError(err);
                  return;
                }

                const facultyId = facultyResult.insertId;
                const linkSql = `INSERT INTO project_faculty (project_id, faculty_id, role) VALUES (?, ?, ?)`;
                db.query(linkSql, [projectId, facultyId, role], (err) => {
                  if (err) {
                    handleError(err);
                    return;
                  }
                  checkCompletion();
                });
              });
            }
          });
        }

        // Insert program head
        if (programHead && programHead.trim()) {
          const facultySql = `INSERT INTO faculty (name, role) VALUES (?, ?)`;
          db.query(facultySql, [programHead.trim(), "Program Head"], (err, facultyResult) => {
            if (err) {
              handleError(err);
              return;
            }

            const facultyId = facultyResult.insertId;
            const linkSql = `INSERT INTO project_faculty (project_id, faculty_id, role) VALUES (?, ?, ?)`;
            db.query(linkSql, [projectId, facultyId, "Program Head"], (err) => {
              if (err) {
                handleError(err);
                return;
              }
              checkCompletion();
            });
          });
        }

        // Insert dean
        if (dean && dean.trim()) {
          const facultySql = `INSERT INTO faculty (name, role) VALUES (?, ?)`;
          db.query(facultySql, [dean.trim(), "Dean"], (err, facultyResult) => {
            if (err) {
              handleError(err);
              return;
            }

            const facultyId = facultyResult.insertId;
            const linkSql = `INSERT INTO project_faculty (project_id, faculty_id, role) VALUES (?, ?, ?)`;
            db.query(linkSql, [projectId, facultyId, "Dean"], (err) => {
              if (err) {
                handleError(err);
                return;
              }
              checkCompletion();
            });
          });
        }
      }
    );
  });
};

// DELETE project
exports.deleteProject = (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required" });
  }

  // Delete all related records in the following order:
  // 1. project_authors
  // 2. project_faculty
  // 3. projects

  const deleteProjectAuthors = `DELETE FROM project_authors WHERE project_id = ?`;
  db.query(deleteProjectAuthors, [projectId], (err) => {
    if (err) {
      console.error("Error deleting project authors:", err);
      return res.status(500).json({ error: "Failed to delete project" });
    }

    const deleteProjectFaculty = `DELETE FROM project_faculty WHERE project_id = ?`;
    db.query(deleteProjectFaculty, [projectId], (err) => {
      if (err) {
        console.error("Error deleting project faculty:", err);
        return res.status(500).json({ error: "Failed to delete project" });
      }

      const deleteProject = `DELETE FROM projects WHERE id = ?`;
      db.query(deleteProject, [projectId], (err, result) => {
        if (err) {
          console.error("Error deleting project:", err);
          return res.status(500).json({ error: "Failed to delete project" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
      });
    });
  });
};

// UPLOAD file to Google Drive
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    // Get title from form data to rename the file
    const title = req.body.title || req.query.title;
    
    // Extract file extension
    const originalName = req.file.originalname;
    const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
    
    // Create new filename based on title (or use original if no title)
    const newFileName = title 
      ? `${title}${fileExtension}` 
      : originalName;

    // Upload file to Google Drive
    const driveResult = await uploadFileToDrive(
      req.file.buffer,
      newFileName,
      req.file.mimetype,
      folderId
    );

    res.json({
      message: "File uploaded successfully to Google Drive",
      fileId: driveResult.fileId,
      fileName: driveResult.name,
      driveLink: driveResult.webViewLink,
      downloadLink: `https://drive.google.com/uc?id=${driveResult.fileId}&export=download`,
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE file from Google Drive
exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ error: "File ID is required" });
    }

    await deleteFileFromDrive(fileId);

    res.json({ message: "File deleted successfully from Google Drive" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET Google Drive OAuth2 authorization URL
exports.getAuthUrl = (req, res) => {
  try {
    const authUrl = getAuthorizationUrl();
    res.json({ authUrl });
  } catch (error) {
    console.error("Error getting auth URL:", error);
    res.status(500).json({ error: error.message });
  }
};

// HANDLE OAuth2 callback and save refresh token
exports.handleAuthCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    const tokens = await getTokensFromCode(code);

    if (tokens.refresh_token) {
      // Return the refresh token so user can add it to .env
      res.json({
        message: "Authorization successful!",
        refreshToken: tokens.refresh_token,
        accessToken: tokens.access_token,
        instructions: "Add this refresh token to your .env file as GOOGLE_REFRESH_TOKEN",
      });
    } else {
      res.json({
        message: "Authorization successful! You may need to re-authorize to get a refresh token.",
        accessToken: tokens.access_token,
      });
    }
  } catch (error) {
    console.error("Error handling auth callback:", error);
    res.status(500).json({ error: error.message });
  }
};

// Proxy endpoint to serve images from Google Drive with CORS headers
exports.getImageProxy = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ error: "File ID is required" });
    }

    // Get file metadata first to know the MIME type
    const metadata = await getFileMetadata(fileId);
    const fileContent = await getFileContent(fileId);

    // Set CORS and appropriate headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', metadata.mimeType);
    res.setHeader('Content-Length', fileContent.length);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    res.send(fileContent);
  } catch (error) {
    console.error("Error fetching image from Google Drive:", error);
    res.status(500).json({ error: error.message });
  }
};