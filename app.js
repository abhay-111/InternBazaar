const mongoose = require("mongoose");
const mongodb = require("mongodb");
const express = require("express");
const authroutes = require("./routes/login");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.use(authroutes);

mongoose
  .connect(
    "mongodb+srv://naman:internbazaar123@cluster0.vnmzf.mongodb.net/Users?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
    console.log("chalu bhaiya");
  })
  .catch((err) => {
    console.log(err);
  });
