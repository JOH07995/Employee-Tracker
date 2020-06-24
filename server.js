const mysql = require(`mysql`);
const { initApp } = require(`./lib/applicationFunctions`);
const { initPrompts } = require(`./lib/prompts`);

const connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `9tjeZmfhVxlUfqInR@2T`,
    database: `employees_db`
});

connection.connect(err => {
    if (err) { throw err; }
    console.log('connected as id ' + connection.threadId);
    initPrompts();
    initApp();
});



exports.connection = connection;