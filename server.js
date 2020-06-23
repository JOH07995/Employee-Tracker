const mysql = require(`mysql`);
// const { initApp } 
// const { initPrompts } 

const connection = mysql.createConnection({
  host: `localhost`,
  port: 3306,
  user: `root`,
  password: `9tjeZmfhVxlUfqInR@2T`,
  database: `employees_db`
});

connection.connect(err => {
  if (err) { throw err; }
  // initPrompts();
  // initApp();
});

exports.connection = connection;