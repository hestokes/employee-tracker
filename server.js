const mysql = require("mysql2");
const express = require("express");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    //Name of database
    database: "employeetrackerDB",
  },
  console.log("Connected to the employeetrackerDb!")
);
//Get a single employee
db.query(`SELECT * FROM employee WHERE id = 1`, (err, rows) => {
  console.log(rows);
});

app.use((req, res) => {
  res.status(404).end();
});

//Delete employee
db.query("DELETE FROM employee WHERE id = ?", 0, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
