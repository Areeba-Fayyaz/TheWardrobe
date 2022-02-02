const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "wasia",
  database: "wardrobedb",
});

var customerName = null;
var customerPassword = null;
var custommerEmail = null;
var customerGender = null;
var customerPhoneNumber = null;
var customerAddress = null;
var customerSavings = null;
var customerOfferUsed = null;

app.post("/signup", (req, res) => {
  const custemail = req.body.custemail;
  const custname = req.body.custname;
  const custpassword = req.body.custpassword;

  db.query(
    "INSERT INTO customer_details (CustName, CustPassword, CustEmail) VALUES (?,?,?)",
    [custname, custpassword, custemail],
    (err, result) => {
      console.log(err);
    }
  );
});

// const custemail;
// const custpassword;

app.post("/login", (req, res) => {
  const custemail = req.body.custemail;
  const custpassword = req.body.custpassword;

  db.query(
    "SELECT * FROM customer_details WHERE CustPassword = ? AND CustEmail = ?",
    [custpassword, custemail],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
        const result2 = Object.values(JSON.parse(JSON.stringify(result)));
        customerName = result2[0]["CustName"];
        customerPassword = result2[0]["CustPassword"];
        customerEmail = result2[0]["CustEmail"];
        customerGender = result2[0]["CustGender"];
        customerPhoneNumber = result2[0]["CustPhoneNumber"];
        customerAddress = result2[0]["CustAddress"];
        customerSavings = result2[0]["CustSavings"];
        customerOfferUsed = result2[0]["CustOffersUsed"];
      } else {
        res.send({ message: "wrong email/password combination" });
      }
    }
  );
});

app.get("/profile", (req, res) => {
  res.send({
    customerName: customerName,
    customerPassword: customerPassword,
    customerEmail: customerEmail,
    customerGender: customerGender,
    customerPhoneNumber: customerPhoneNumber,
    customerAddress: customerAddress,
    customerSavings: customerSavings,
    customerOffersUsed: customerOfferUsed,
  });
});

// app.get("/profile", (req, res) => {
//   const custemail = req.body.custemail;
//   const custname = req.body.custname;
//   const custpassword = req.body.custpassword;

//   const sqlSelect = "SELECT * FROM customer_details";

//   db.query(sqlSelect, (err, result) => {
//     console.log(err);
//   });
// });

// db.query("SELECT * FROM customer_details WHERE CustPassword = ? AND CustEmail = ?", (err, res) => {
//   return console.log(res);
// });

app.listen(3001, () => {
  console.log("running server");
});
