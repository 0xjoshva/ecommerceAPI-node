// Import needed libraries
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

// Import routes
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

// Configure Server
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Don't let local development give errors

// This is where we check URLs and Request methods to create functionality
// GET '/' is always what will be displayed on the home page of your application

// Use individual routes when visiting these URLS
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

//linking css and html to node db
app.use(express.static("public")); //public is name of html file

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome" });
// });

// Set up server to start listening for requests
app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
