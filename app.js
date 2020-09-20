const mongoose = require("mongoose");
const mongodb = require("mongodb");
const express = require("express");
const authroutes = require("./routes/auth");
const bodyParser = require("body-parser");
const app = express();

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

app.use(authroutes);

app.use((error, req, res, next) => {
  const status = error.statusCode;
  const data = error.data;
  const message = error.message;

  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    "mongodb+srv://naman:namanbazaar@cluster0.vnmzf.mongodb.net/Users?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
    console.log("Server up and running");
  })
  .catch((err) => {
    console.log(err);
  });
