# Employee-Tracker

Node based application that allows the user (Business Owner) to: 

* Add departments, roles, employees

* View departments, roles, employees

* Update employee roles

* Update employee managers

* View employees by manager

* Delete departments, roles, and employees

* View the total utilized budget of a department -- the combined salaries of all employees in that department

This is done by connecting to a MySQL database. User interaction is driven by inquirer serving up dynamic options pulled from the employee database. The console.table package was used to present an easy to read layout in the CLI. 


## Installation

To install and use locally, 
1. ```git clone``` this repository to a local directory
2. Run the ```schema.sql``` (found in db folder) script in MySQLWorkbench, or from the terminal to initialize and begin using the database
3. Optionally, run the ```seed.sql``` (found in db folder) script to populate the database with some data
4. Install the dependencies via the terminal by running:
```bash
npm i
```
5. Then run the application with:

```bash
node server.js
```

## Usage 

Program is run by executing "node app.js"

You can then use the arrow keys to navigate the menu and make your selections.The application will receive your input to the prompts to interact with the employee database. As a user, you have full Create, Read, Update, and Delete cuntionality available to you.

# Technologies

This application was built with:

* JavaScript
* [MySQL](https://dev.mysql.com/doc/)
* [Node](https://nodejs.org/en/)

The dependencies required:

```
  "dependencies": {
    "console.table": "^0.10.0",
    "inquirer": "^7.2.0",
    "mysql": "^2.18.1"
  }
  ```

Documentation on dependencies:

* [console.table](https://www.npmjs.com/package/console.table)
* [inquirer](https://www.npmjs.com/package/inquirer)
* [mysql](https://www.npmjs.com/package/mysql)

# Enhancements
This ended up being a very verbose solution centered around CRUD, I think there are opportunities to simplify the user interaction with the prompts, shortening 'click through'.

