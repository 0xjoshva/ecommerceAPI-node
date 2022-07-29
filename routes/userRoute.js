const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require("bcryptjs");

// Register Route
// The Route where Encryption starts
router.post("/register", (req, res) => {
  try {
    //sql Query Statement
    let sql = "INSERT INTO users SET ?";
    //the body of the request
    const {
      full_name,
      email,
      password,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    } = req.body;

    // The start of hashing / encryption
    //salt is the length of a single character in the password
    const salt = bcrypt.genSaltSync(10);
    //
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      full_name,
      email,
      // We sending the hash value to be stored within the table
      password: hash,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    };

    //connection to database
    //accepting sql and user variables
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      //message sent upon successful registration
      res.send(`User ${(user.full_name, user.email)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});


// Login
// The Route where Decryption happens
router.post("/login", (req, res) => {
  try {
    //sql query
    let sql = "SELECT * FROM users WHERE ?";
    //which values it is accepting
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        //error if email found in database
        res.send("Email not found please register");
      } else {
        // Decryption
        // Accepts the password stored in database and the password given by user (req.body)
        //requesting password
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        // If password does not match
        if (isMatch === false) {
          res.send("Password incorrect");
        }
        else {
          res.send(result)
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//GET
router.get("/", (req, res) => {
  try {
    con.query(`SELECT * FROM users`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//GET SINGLE ITEM
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM users WHERE user_id = '${req.params.id}'`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
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
router.delete("/:id", (req, res) => {
  try {
      con.query(`DELETE FROM products WHERE user_id = '${req.params.id}'`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//EDIT
router.put("/:id", (req, res) => {
  try {
    con.query(
      `UPDATE users 
         SET email = '${email}', 
         password = '${password}', 
         full_name = '${full_name}', 
         billing_address = '${billing_address}', 
         default_shipping_address = '${default_shipping_address}'
         country = '${country}'
         phone = '${phone}'
         user_type = '${user_type}'
         WHERE order_id = '${req.params.id}'`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
