// all the queries that will be run in the application
// made as a module to keep them all separate and organized


// All Employees -- more data than just emplyee tbl, also the role info and department from the respective tables joined
const allEmployees =
    `
SELECT 
employee.id AS 'Employee ID', 
employee.first_name AS 'First Name', 
employee.last_name AS 'Last Name',
role.title AS 'Title', 
department.name AS 'Department', 
role.salary AS 'Salary',
concat(emp.first_name, ' ', emp.last_name) AS 'Manager Name'

FROM employee 
  INNER JOIN role ON (employee.role_id = role.id)
  INNER JOIN department ON (role.department_id = department.id)
  LEFT JOIN employee emp ON (employee.manager_id = E.id)
ORDER BY employee.id;
`;

// returns list of departments
const allDepartments = `SELECT name AS Departments FROM department`;

// returns all the roles at the company
const allRoles = `SELECT title AS Roles FROM role`;

// this will add an employee, given what is entered in the inquirer prompt function
const addEmployee = `INSERT INTO employee SET ?`;

// this will add a department, given what is entered in the inquirer prompt function
const addDepartment = `INSERT INTO department SET ?`;

// this will add a role, given what is entered in the inquirer prompt function
const addRole = `INSERT INTO role SET ?`;

// this will update an existing employee, given what is entered in the inquirer prompt function
const updateEmployee = `UPDATE employee SET ? WHERE ?`;

// this will update an existing employee, given what is entered in the inquirer prompt function
const managerUpdate = `UPDATE employee SET ? WHERE ?`;

// employee list of names
const employeesFullName = `SELECT concat(first_name, ' ', last_name) AS full_name FROM employee`;

// returns the employees under a department taken from the inquirer prompt
const employeesDepartment =
    `
SELECT 
concat(employee.first_name, ' ', employee.last_name) AS 'Department Employees'

FROM employee
LEFT JOIN role ON (employee.role_id = role.id)
LEFT JOIN department on (role.department_id = department.id)
WHERE department.id = ?`;

// returns the employees for a manager, taking the manager id from the inquirer prompt
const employeesManager =
    `
SELECT 
concat(employee.first_name, ' ', employee.last_name) AS Staff

FROM employee
LEFT JOIN employee emp on (employee.manager_id = emp.id)
WHERE employee.manager_id = ?`;

// this will total up the salaries of employees for a given department, returned as 'Budget Utilized'
const budget =
    `
SELECT 
department.name AS Department, 
sum(salary) AS 'Budget Utilized'

FROM employee
  INNER JOIN role
	  on employee.role_id = role.id
  INNER JOIN department
	  on role.department_id = department.id
WHERE department.name = ?;
`;

// delete an employee from the db, given the inquirer response
const removeEmployee = `DELETE FROM employee WHERE ?`;

// delete a department from the db, given the inquirer response
const removeDepartment = `DELETE FROM department WHERE ?`;

// delete a role from the db, given the inquirer response
const removeRole = `DELETE FROM role WHERE ?`;


//export these nice queries to be used elsewhere
module.exports = {
    allEmployees,
    allDepartments,
    allRoles,
    addEmployee,
    addDepartment,
    addRole,
    updateEmployee,
    managerUpdate,
    employeesFullName,
    employeesDepartment,
    employeesManager,
    budget,
    removeEmployee,
    removeDepartment,
    removeRole
};