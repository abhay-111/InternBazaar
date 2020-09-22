const mongoose = require("mongoose");
const mongodb = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const config=require('./config')
const app = express();

const internshipRoutes = require("./routes/internship");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/auth", authRoutes);
app.use(internshipRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode;
  const data = error.data;
  const message = error.message;

  res.status(status).json({
    message: message,
    data: data,
  });
});
// "mongodb+srv://naman:namanbazaar@cluster0.vnmzf.mongodb.net/Users?retryWrites=true&w=majority"
mongoose
  .connect(
    config.mongoapikey,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((result) => {
    app.listen(8080);
    console.log("Server up and running");
  })
  .catch((err) => {
    console.log(err);
  });
