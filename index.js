const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5000; //Save the port number where your server will be listening
// const mongoose = require("mongoose");
const routes = require("./src/routes/index");
const products = require("./src/routes/products");
require("dotenv").config();
const connectDB = require("./src/config/db");

connectDB();

app.use(express.json({ extended: false }));
app.use(routes);
app.use(products);
app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`, process.env.MONGO_URL);
});
