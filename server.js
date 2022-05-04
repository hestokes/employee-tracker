require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: process.env.password,
  database: "employeetrackerDB;",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connection complete as id ${connection.threadId}`);
  startAdding();
});

startAdding = () => {
  inquirer
    .prompt([
      {
        name: "optionMenu",
        type: "rawlist",
        message: "Welcome! What is your plan today?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "View all employees by Manger",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's Role",
          "Update an employee's Manager",
          "Remove a department",
          "Remove a role",
          "Remove an employee",
          "View total salaries by department",
          "Say goodbe for now",
        ],
      },
    ])
    .then((response) => {});
};

// const PORT = process.env.PORT || 3001;
// const app = express();

// //Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
