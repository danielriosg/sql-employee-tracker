const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contrasena",
  database: "employee_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the employee_db database.");
});

// Add your routes and middleware here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
