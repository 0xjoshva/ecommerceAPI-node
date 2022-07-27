const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
router.get("/categories", (req, res) => {
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
router.post("/categories", (req, re) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      "INSERT INTO categories ('${name}', '${description}', '${thumbnail}",
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
