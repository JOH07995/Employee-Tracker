-- INSERT seed values into department table
INSERT INTO
    department
    (name)
VALUES
    ("Sales"),
    ("IT"),
    ("Finance"),
    ("Legal");


-- INSERT seed values into role table
INSERT INTO
    role
    (title, salary, department_id)
VALUES
    ("Sales Lead", 75000, 1),
    ("Salesperson", 60000, 1),
    ("Lead Engineer", 120000, 2),
    ("Software Engineer", 85000, 2),
    ("Accountant", 75000, 3),
    ("Legal Team Lead", 150000, 4),
    ("Lawyer", 125000, 4);


-- INSERT seed values into employee table
INSERT INTO
    employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Demetrius", "Kramer", 1, 3),
    ("Katelyn", "Kerns", 2, 1),
    ("Ileana", "Mcdougal", 3, NULL),
    ("Sixta", "Lavender", 4, 3),
    ("Sommer", "Lantz", 5, NULL),
    ("Jess", "Henke", 6, NULL),
    ("Blaine", "Quintana", 7, 7),
    ("Kirby", "Ellington", 3, 2);

-- Alters employee table to add the foreign key reference for manager id, and accounts for deleting that employee (SET NULL)
ALTER TABLE employee ADD FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL;