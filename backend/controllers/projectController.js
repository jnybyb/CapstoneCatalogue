const db = require("../config/db");

// GET all projects
exports.getProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// ADD project
exports.addProject = (req, res) => {
  const { bookNum, title, authors, month, year, abstract } = req.body;

  const sql = `
    INSERT INTO projects 
    (bookNum, title, authors, month, year, abstract)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [bookNum, title, authors, month, year, abstract],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: "Project added" });
      }
    }
  );
};