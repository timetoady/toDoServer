const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//define routes
const todoRoutes = require('./routes/todoRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

//Access MongoDB
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Might do a static site here later. Just for the practice.
app.get("/", (_, res) => {
    res.send("Server for todo app.");
  });

  //routes
  app.use('/todos', todoRoutes)
  app.use('/categories', categoryRoutes)
  

app.listen(port, () => {
    console.log(`Server running hard on port ${port}`);
  });