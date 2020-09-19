const mongoose = require('mongoose');
const mongodb=require('mongodb')
const express = require('express');
const authroutes=require('./routes/login')
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.json())



app.use(authroutes)



mongoose
  .connect('mongodb://localhost:27017/masterDB')
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
