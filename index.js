const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5000; //Save the port number where your server will be listening
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const routes = require("./src/routes/index");
const products = require("./src/routes/products");
require("dotenv").config();
const connectDB = require("./src/config/db");
const cart = require("./src/routes/cart");
connectDB();

app.use(express.json({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "client/public"));
app.use("client/public", express.static("public"));
app.use(routes);
app.use(products);
app.use(cart);
app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`, process.env.MONGO_URL);
});
