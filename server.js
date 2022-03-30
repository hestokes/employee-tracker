const mysql = require("mysql2");
const express = require("express");
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
    //enter name of your database in the database: "here"
    database: "",
  },
  console.log("connected to the database")
);

//request to see all candidates
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

//request to see a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, rows) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });

//Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
