-- Drops the employees_db if it already exists --
DROP DATABASE IF EXISTS employees_db;

-- Create the database employees_db and specified it for use.
CREATE DATABASE employees_db;

USE employees_db;

-- Create the table department.
CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Create the table role.
CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE CASCADE
);

-- Create the table employee.
CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id)
    ON DELETE CASCADE
);