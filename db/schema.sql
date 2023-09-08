-- Drop the database if it exists
DROP DATABASE IF EXISTS employee_db;

-- Create the database
CREATE DATABASE employee_db;

-- Use the newly created database
USE employee_db;

-- Create the department table
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);



-- Create the role table
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create the employee table
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_name VARCHAR(60), -- Store manager's full name here
  FOREIGN KEY (role_id) REFERENCES role(id)
);

