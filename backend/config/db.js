const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

// Initially connect without specifying a database to allow database creation
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("MySQL Connected");

  // Read and execute schema.sql (which creates the database if it doesn't exist)
  const schemaPath = path.join(__dirname, "../database/schema.sql");
  fs.readFile(schemaPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading schema.sql:", err);
      return;
    }

    // Split queries by semicolon and filter empty ones
    const queries = data
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    // Execute each query
    let completed = 0;
    queries.forEach((query) => {
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error executing schema query:", err.message);
          return;
        }
        completed++;
        console.log(`Schema query ${completed}/${queries.length} executed successfully`);

        if (completed === queries.length) {
          console.log("Database schema initialized successfully");
        }
      });
    });
  });
});

module.exports = db;