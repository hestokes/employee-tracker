require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const express = require("express");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "employeetrackerDB",
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
          "Say goodbye for now",
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
        case "Say goodbye for now":
          connection.end();
          console.log("\n Goodbye for now!");
          return;
        default:
          break;
      }
    });
};

viewAllDepartments = () => {
  connection.query(
    `SELECT * FROM department ORDER BY department_id ASC;`,
    (err, res) => {
      if (err) throw err;
      console.table("\n", res, "\n");
      startAdding();
    }
  );
};

viewAllRoles = () => {
  connection.query(
    `SELECT role.role_id, role.title, role.salary, department.department_name, department.department_id FROM role JOIN department ON role.role_id = department.department_id ORDER BY role.role_id ASC;`,
    (err, res) => {
      if (err) throw err;
      console.table("\n", res, "\n");
      startAdding();
    }
  );
};

viewAllEmployees = () => {
  connection.query(
    `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id ORDER BY e.employee_id ASC;`,
    (err, res) => {
      if (err) throw err;
      console.table("\n", res, "\n");
      startAdding();
    }
  );
};

viewEmployeesByManger = () => {
  connection.query(
    `SELECT employee_id, first_name, last_name FROM employee ORDER BY employee_id ASC;`,
    (err, res) => {
      if (err) throw err;
      let managers = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.employee_id,
      }));
      inquirer
        .prompt([
          {
            name: "manager",
            type: "rawlist",
            message: "Which manager would you like to see the employee's of?",
            choices: managers,
          },
        ])
        .then((response) => {
          connection.query(
            `SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id WHERE e.manager_id = ${response.manager} ORDER BY e.employee_id ASC`,
            (err, res) => {
              if (err) throw err;
              console.table("\n", res, "\n");
              startAdding();
            }
          );
        });
    }
  );
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDept",
        type: "input",
        message: "What would you like to name your new Department?",
      },
    ])
    .then((response) => {
      connection.query(
        `INSERT INTO department SET ?`,
        {
          department_name: response.newDept,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `\n ${response.newDept} successfully added to database! \n`
          );
          startAdding();
        }
      );
    });
};

addARole = () => {
  connection.query(`SELECT * FROM department;`, (err, res) => {
    if (err) throw err;
    let departments = res.map((department) => ({
      name: department.department_name,
      value: department.department_id,
    }));
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What would you like to call the new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the new roles salary?",
        },
        {
          name: "deptName",
          type: "rawlist",
          message: "Which department would you like to add the new role to?",
          choices: departments,
        },
      ])
      .then((response) => {
        connection.query(
          `INSERT INTO role SET ?`,
          {
            title: response.title,
            salary: response.salary,
            department_id: response.deptName,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.title} successfully added! \n`);
            startAdding();
          }
        );
      });
  });
};

addAnEmployee = () => {
  connection.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({ name: role.title, value: role.role_id }));
    connection.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.employee_id,
      }));
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the new team member's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the new team member's last name?",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the new team member's title?",
            choices: roles,
          },
          {
            name: "manager",
            type: "rawlist",
            message: "Who is the new team member's manager?",
            choices: employees,
          },
        ])
        .then((response) => {
          connection.query(
            `INSERT INTO employee SET ?`,
            {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: response.role,
              manager_id: response.manager,
            },
            (err, res) => {
              if (err) throw err;
            }
          );
          connection.query(
            `INSERT INTO role SET ?`,
            {
              department_id: response.dept,
            },
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n ${response.firstName} ${response.lastName} is successfully aboard! \n`
              );
              startAdding();
            }
          );
        });
    });
  });
};

updateAnEmployeeRole = () => {
  connection.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({ name: role.title, value: role.role_id }));
    connection.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.employee_id,
      }));
      inquirer
        .prompt([
          {
            name: "employee",
            type: "rawlist",
            message: "Which team member is getting an updated role?",
            choices: employees,
          },
          {
            name: "newRole",
            type: "rawlist",
            message: "What is the lucky team member's new role?",
            choices: roles,
          },
        ])
        .then((response) => {
          connection.query(
            `UPDATE employee SET ? WHERE ?`,
            [
              {
                role_id: response.newRole,
              },
              {
                employee_id: response.employee,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n Successfully updated employee's role in the database! \n`
              );
              startAdding();
            }
          );
        });
    });
  });
};

updateAnEmployeeManager = () => {
  connection.query(`SELECT * FROM employee;`, (err, res) => {
    if (err) throw err;
    let employees = res.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.employee_id,
    }));
    inquirer
      .prompt([
        {
          name: "employee",
          type: "rawlist",
          message: "Which team member is getting a Manager update?",
          choices: employees,
        },
        {
          name: "newManager",
          type: "rawlist",
          message: "Who should the team members's new manager be?",
          choices: employees,
        },
      ])
      .then((response) => {
        connection.query(
          `UPDATE employee SET ? WHERE ?`,
          [
            {
              manager_id: response.newManager,
            },
            {
              employee_id: response.employee,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(
              `\n Successfully updated employee's manager in the database! \n`
            );
            startAdding();
          }
        );
      });
  });
};

removeDepartment = () => {
  connection.query(
    `SELECT * FROM department ORDER BY department_id ASC;`,
    (err, res) => {
      if (err) throw err;
      let departments = res.map((department) => ({
        name: department.department_name,
        value: department.department_id,
      }));
      inquirer
        .prompt([
          {
            name: "deptName",
            type: "rawlist",
            message: "Which department would you like to remove?",
            choices: departments,
          },
        ])
        .then((response) => {
          connection.query(
            `DELETE FROM department WHERE ?`,
            [
              {
                department_id: response.deptName,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n Successfully removed the department from this world! \n`
              );
              startAdding();
            }
          );
        });
    }
  );
};

removeRole = () => {
  connection.query(`SELECT * FROM role ORDER BY role_id ASC;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({ name: role.title, value: role.role_id }));
    inquirer
      .prompt([
        {
          name: "title",
          type: "rawlist",
          message: "Which role would you like to remove?",
          choices: roles,
        },
      ])
      .then((response) => {
        connection.query(
          `DELETE FROM role WHERE ?`,
          [
            {
              role_id: response.title,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`\n Successfully removed the role from this world! \n`);
            startAdding();
          }
        );
      });
  });
};

removeEmploy = () => {
  connection.query(
    `SELECT * FROM employee ORDER BY employee_id ASC;`,
    (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.employee_id,
      }));
      inquirer
        .prompt([
          {
            name: "employee",
            type: "rawlist",
            message: "Which employee would you like to remove?",
            choices: employees,
          },
        ])
        .then((response) => {
          connection.query(
            `DELETE FROM employee WHERE ?`,
            [
              {
                employee_id: response.employee,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n Successfully removed the team member from the team! \n`
              );
              startAdding();
            }
          );
        });
    }
  );
};

viewDepartmentSalary = () => {
  connection.query(
    `SELECT * FROM department ORDER BY department_id ASC;`,
    (err, res) => {
      if (err) throw err;
      let departments = res.map((department) => ({
        name: department.department_name,
        value: department.department_id,
      }));
      inquirer
        .prompt([
          {
            name: "deptName",
            type: "rawlist",
            message: "Which department's total salary would you like review'?",
            choices: departments,
          },
        ])
        .then((response) => {
          connection.query(
            `SELECT department_id, SUM(role.salary) AS total_salary FROM role WHERE ?`,
            [
              {
                department_id: response.deptName,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n The current total salary of the ${response.deptName} department is $ \n`
              );
              console.table("\n", res, "\n");
              startAdding();
            }
          );
        });
    }
  );
};

// const PORT = process.env.PORT || 3001;
// const app = express();

// //Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
