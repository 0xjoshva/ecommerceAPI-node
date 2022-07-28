const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

//GET
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
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
      amount,
      shipping_address,
      order_email,
      order_date,
      order_status
  } = req.body;
  try {
    con.query(
      `INSERT INTO orders (amount, shipping_address, order_email, order_date, order_status) values ('${amount}', '${shipping_address}', '${order_email}', '${order_date}', '${order_status}')`,
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
      con.query(`DELETE FROM orders WHERE order_id = ${req.params.id}`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});


module.exports = router;
