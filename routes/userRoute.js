const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

//GET
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//POST
router.post("/", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;
  try {
    con.query(
      `INSERT INTO users (email, password, full_name, billing_address, default_shipping_address, country, phone, user_type) values ('${email}', '${password}', '${full_name}', '${billing_address}', '${default_shipping_address}', '${country}', '${phone}', '${user_type}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(err);
  }
});

//DELETE
router.delete("/", (req, res) => {
  try {
      con.query(`DELETE FROM products WHERE user_id = ${req.params.id}`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
