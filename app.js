const mongoose = require("mongoose");
const mongodb = require("mongodb");
const express = require("express");
const authroutes = require("./routes/auth");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

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
    "mongodb+srv://abhay:abhaybazaar123@cluster0.vnmzf.mongodb.net/Users?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
    console.log("Server up and running");
  })
  .catch((err) => {
    console.log(err);
  });
