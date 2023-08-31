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
        case "View all employees":
          viewEmployees(); // Add this line
          break;
        case "Add a department":
          addDepartment();
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

function viewDepartments() {
  const query = "SELECT id, name FROM department";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving departments:", err);
      return;
    }
    console.table(results); // Display the retrieved data
    startApp(); // Go back to the main menu
  });
}

function viewRoles() {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving roles:", err);
      return;
    }
    console.table(results); // Display the retrieved data
    startApp(); // Go back to the main menu
  });
}

function viewEmployees() {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name,
      role.title, role.salary, department.name AS department,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving employees:", err);
      return;
    }
    console.table(results); // Display the retrieved data
    startApp(); // Go back to the main menu
  });
}
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "Enter the name of the new department:",
    })
    .then((answers) => {
      const departmentName = answers.departmentName;

      // Execute the SQL INSERT query
      const query = "INSERT INTO department (name) VALUES (?)";
      db.query(query, [departmentName], (err, result) => {
        if (err) {
          console.error("Error adding department:", err);
          return;
        }
        console.log("Department added successfully!");
        startApp(); // Go back to the main menu
      });
    });
}

// Define the exitApp function
function exitApp() {
  console.log("Exiting the application.");
  db.end(); // Close the database connection
}

