require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const express = require("express");
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
          "Update an employees Role",
          "Update an employees Manager",
          "Remove a department",
          "Remove a role",
          "Remove an employee",
          "View total salaries by department",
          "Say goodbe for now",
        ],
      },
    ])
    .then((response) => {
      switch (response.optionMenu) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all employees by Manger":
          viewEmployeesByManger();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addARole();
          break;
        case "Add an employee":
          addAnEmployee();
          break;
        case "Update an employee Role":
          updateAnEmployeeRole();
          break;
        case "Update an employees Manager":
          updateAnEmployeeManager();
          break;
        case "Remove a department":
          removeDepartment();
          break;
        case "Remove a role":
          removeRole();
          break;
        case "Remove an employee":
          removeEmploy();
          break;
        case "View total salaries by department":
          viewDepartmentSalary();
          break;
        case "Say goodbe for now":
          connection.end();
          console.log("\n Goodbye for now!");
          return;
        default:
          break;
      }
    });
};

viewAllDepartments();
viewAllRoles;
viewAllEmployees;
viewEmployeesByManger;
addDepartment;
addARole;
addAnEmployee;
updateAnEmployeeRole;
updateAnEmployeeManager;
removeDepartment;
removeRole;
removeEmploy;
viewDepartmentSalary;

// const PORT = process.env.PORT || 3001;
// const app = express();

// //Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
