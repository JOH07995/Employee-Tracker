// link to the server.js module
const server = require(`../server`);
// links to the prepared queries run in this module
const queries = require(`./query`);

// getting our variable arrays set up
const roleChoices = [];
const employeeChoices = [];
const departmentChoices = [];
const employeeIds = [];
const departmentIds = [];
const roleIds = [];


// !!!
// we'll run the prompts and then update info based on selections
function initPrompts() {
    updateInfo(getDBInfo);
}


// !!!
// this does stuff
function fillArr(arr, table, col, res) {
    arr.length = 0;

    for (table of res) {
        arr.push(table[col]);
    }

    if (arr === employeeIds || arr === departmentIds || arr === roleIds) {
        // this sorts numbers in ascending order
        arr.sort((a, b) => a - b);
    }
}

// !!!
// Pulls in  SQL database info for each table, then preps them for response choices
function getDBInfo(table, column) {
    let choiceArr;

    switch (table) {
        case `department`:
            choiceArr = departmentChoices;
            break;
        case `role`:
            choiceArr = roleChoices;
            break;
        case `employee`:
            choiceArr = employeeChoices;
            break;
        default:
            throw new Error(`Unknown table, unexpected case.`);
    }

    // returns the employee name list
    if (table === `employee` && column === `full_name`) {
        app.connection.query(queries.employeesFullName, (err, res) => {
            if (err) { throw err; }
            fillArr(choiceArr, table, column, res);
        });
        // or else !!!
    } else {
        // !!!
        app.connection.query(`SELECT ${column} FROM ${table}`, (err, res) => {
            if (err) { throw err; }

            switch (column) {
                case `name`:
                    fillArr(choiceArr, table, column, res);
                    break;
                case `title`:
                    fillArr(choiceArr, table, column, res);
                    break;
                case `id`:
                    if (table === `employee`) {
                        fillArr(employeeIds, `ids`, column, res);
                    } else if (table === `department`) {
                        fillArr(departmentIds, `ids`, column, res);
                    } else if (table === `role`) {
                        fillArr(roleIds, `ids`, column, res);
                    }
                    break;
                default:
                    throw new Error(`Unknown column, unexpected case.`);
            }
        });
    }
}

// callbacks for info updates
function updateInfo(cb) {
    cb(`role`, `title`);
    cb(`department`, `name`);
    cb(`employee`, `full_name`);
    cb(`employee`, `id`);
    cb(`department`, `id`);
    cb(`role`, `id`);
}

// the main show, the prompts to respond to. Laid out all the options by CRUD and the given table/action
const prompts = {
    main: {
        name: `CRUD`,
        type: `list`,
        message: `What would you like to do?`,
        choices: [
            `View database`,
            `Add to database`,
            `Update database`,
            `Delete from database`,
            `Exit`
        ]
    },
    view: {
        name: `View`,
        type: `list`,
        choices: [
            `Employees`,
            `Departments`,
            `Roles`,
            `Employees by Department`,
            `Employees by Manager`,
            `Department Budget Utilized`,
            `Back`,
            `Exit`
        ]
    },
    viewEmployeesDepartment: {
        name: `employeesDepartment`,
        type: `list`,
        message: `Which department employees would you like to view?`,
        choices: departmentChoices
    },
    viewEmployeesManager: {
        name: `employeesManager`,
        type: `list`,
        message: `Which manager's direct reports would you like to view?`,
        choices: employeeChoices
    },
    viewBudget: {
        name: `departmentBudget`,
        type: `list`,
        message: `Which department's salary budget would you like to view?`,
        choices: departmentChoices
    },
    add: {
        name: `Add`,
        type: `list`,
        choices: [`Employee`, `Department`, `Role`, `Back`, `Exit`]
    },
    update: {
        name: `Update`,
        type: `list`,
        choices: [`Employee Role`, `Employee Manager`, `Back`, `Exit`]
    },
    remove: {
        name: `Remove`,
        type: `list`,
        choices: [`Employee`, `Department`, `Role`, `Back`, `Exit`]
    },
    addEmployee: [
        {
            name: `firstName`,
            type: `input`,
            message: `What is the employee's first name?`,
            validate: name => {
                // regex for name validation
                const check = name.match(/^[A-Z][a-z]*$/);
                if (check) {
                    return true;
                } else {
                    return `Please enter a valid first name`;
                }
            }
        },
        {
            name: `lastName`,
            type: `input`,
            message: `What is the employee's last name?`,
            validate: name => {
                // regex for name validation
                const check = name.match(/^[A-Z][a-z]*$/);
                if (check) {
                    return true;
                } else {
                    return `Please enter a valid last name`;
                }
            }
        },
        {
            name: `role`,
            type: `list`,
            message: `What is the employee's role?`,
            choices: roleChoices
        },
        {
            name: `manager`,
            type: `list`,
            message: `Who is the employee's manager?`,
            choices: employeeChoices
        }
    ],
    addDepartment: [
        {
            name: `departmentName`,
            type: `input`,
            message: `What is the name of the department?`,
            validate: department => {
                const check = department.match(
                    // regex for valid department names
                    /^[a-zA-Z]+(([ -][a-zA-Z ])?[a-zA-Z]*)*$/
                );
                if (check) {
                    return true;
                } else {
                    return `Please enter a valid name for the department`;
                }
            }
        }
    ],
    addRole: [
        {
            name: `roleName`,
            type: `input`,
            message: `What is the name of the role?`,
            validate: role => {
                // regex for valid role names
                const check = role.match(/^[a-zA-Z]+(([ -][a-zA-Z ])?[a-zA-Z]*)*$/);
                if (check) {
                    return true;
                } else {
                    return `Please enter a valid name for the role.`;
                }
            }
        },
        {
            name: `salary`,
            type: `input`,
            message: `What is the salary for this role?`,
            validate: salary => {
                // regex for salary entered
                const check = salary.match(/^[1-9][0-9]*([.][0-9]{2}|)$/);
                if (check) {
                    return true;
                } else {
                    return `Please enter a valid salary.`;
                }
            }
        },
        {
            name: `roleDepartment`,
            type: `list`,
            message: `What department is this role in?`,
            choices: departmentChoices
        }
    ],
    updateEmployeeRole: [
        {
            name: `updateEmployee`,
            type: `list`,
            message: `Which employee's role would you like to update?`,
            choices: employeeChoices
        },
        {
            name: `roleUpdate`,
            type: `list`,
            message: `What is the employee's new role?`,
            choices: roleChoices
        }
    ],
    updateEmployeeManager: [
        {
            name: `updateEmployee`,
            type: `list`,
            message: `Which employee's manager would you like to update?`,
            choices: employeeChoices
        },
        {
            name: `managerUpdate`,
            type: `list`,
            message: `Who is the employee's new manager?`,
            choices: employeeChoices
        }
    ],
    removeEmployee: {
        name: `removeEmployee`,
        type: `list`,
        message: `Which employee would you like to remove?`,
        choices: employeeChoices
    },
    removeDepartment: {
        name: `removeDepartment`,
        type: `list`,
        message: `Which department would you like to remove?`,
        choices: departmentChoices
    },
    removeRole: {
        name: `removeRole`,
        type: `list`,
        message: `Which role would you like to remove?`,
        choices: roleChoices
    }
};

module.exports = {
    prompts,
    initPrompts,
    employeeChoices,
    roleChoices,
    departmentChoices,
    employeeIds,
    departmentIds,
    roleIds
};
