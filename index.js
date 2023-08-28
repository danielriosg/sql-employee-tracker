const inquirer = require("inquirer");
const mysql = require("mysql2");

// Create a database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contrasena",
  database: "employee_db",
});

// Initialize the connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the employee_db database.");

  // Start the application
  startApp();
});

// Define the startApp function
function startApp() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      // Call appropriate function based on user's choice
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        // Add cases for other choices
        case "Exit":
          exitApp();
          break;
        default:
          console.log("Invalid choice");
          break;
      }
    });
}

// Define the viewDepartments function
function viewDepartments() {
  // SQL query to retrieve departments will be added here
}

// Define the viewRoles function
function viewRoles() {
  // SQL query to retrieve roles will be added here
}

// Define the exitApp function
function exitApp() {
  console.log("Exiting the application.");
  db.end(); // Close the database connection
}

