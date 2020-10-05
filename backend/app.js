const mongoose = require("mongoose");
const otpGenerator = require("otp-generator");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "Logo-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//custom imports
const config = require("../backend/config");
const internshipRoutes = require("./routes/internship");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
app.use(express.static(path.join(__dirname, "resume")));
app.use(express.static(path.join("images")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

//CORS HEADERS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//Routing requests
app.use("/auth", authRoutes);
app.use("/internship", internshipRoutes);
app.use("/profile", profileRoutes);

//handling errors
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;

  res.status(status).json({
    message: message,
    data: data,
  });
});

//connecting to mongodb database
mongoose
  .connect(config.mongoapikey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    app.listen(8080);

    console.log("Server up and running");
  })
  .catch((err) => {
    console.log(err);
  });
