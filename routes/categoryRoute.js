const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `INSERT INTO categories (name, description, thumbnail) values ('${name}', '${description}', '${thumbnail}', '${billing_address}', '${default_shipping_address}', '${country}', '${phone}', '${user_type}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
