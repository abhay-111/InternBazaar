const Internship = require("../models/Internship");
const { validationResult } = require("express-validator/check");
const User = require("../models/User");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// // adding internships to database
exports.addInternships = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  // const skillreq=req.body.skillsReq
  var internshipType = req.body.internshipType;
  const title = req.body.title;
  const description = req.body.description;
  const stipend = req.body.stipend;
  const internshipPeriod = req.body.internshipPeriod;
  const companyName = req.body.companyName;
  const startDate = req.body.startDate;
  const applyBy = req.body.applyBy;
  const vacancy = req.body.vacancy;
  const skillsReq = req.body.skillsReq;
  const perks = req.body.perks;
  const whocanApply = req.body.whocanApply;
  var location = req.body.location;
  var creatorId = req.body.creatorId;
  location = String(location).toLowerCase();
  internshipType = String(internshipType).toLowerCase();

  const internship = new Internship({
    creatorId: creatorId,
    location: location,
    vacancy: vacancy,
    skillsReq: skillsReq,
    title: title,
    description: description,
    stipend: stipend,
    internshipPeriod: internshipPeriod,
    companyName: companyName,
    internshipType: internshipType,
    applyBy: applyBy,
    startDate: startDate,
    whocanApply: whocanApply,
    perks: perks,
    creatorId: creatorId,
  });
  internship
    .save()
    .then((data) => {
      res.status(200).json({
        message: "Internship added",
        perks: perks,
        whocanApply: whocanApply,
        title: title,
        description: description,
        stipend: stipend,
        internshipPeriod: internshipPeriod,
        companyName: companyName,
        internshipType: internshipType,
        applyBy: applyBy,
        startDate: startDate,
        location: location,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getInternships = (req, res, next) => {
  Internship.find(req.query)
    .then((result) => {
      if (result.length === 0) {
        return res.status(422).json({
          message: "No such internships found",
        });
      }

      res.status(200).json({
        message: "Internships loaded",

        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewinternship = (req, res, next) => {
  const internshipId = req.params.internshipId;
  console.log(typeof internshipId);

  Internship.findById(internshipId)
    .then((data) => {
      // console.log("ABHAY", data);
      if (!data) {
        const error = new Error("No such internship exists");
        error.statusCode = 422;
        error.data = {
          value: null,
          msg: "Internship not found ",
          // param: internshipId,
          location: "viewinternship",
        };
        throw error;
      }

      res.status(200).json({
        message: "Internship Found",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.allinternships = (req, res, next) => {
  Internship.find({})
    .then((result) => {
      if (result.length === 0) {
        const error = new Error("No internship found");
        error.status = 401;
        throw error;
      }

      res.status(200).json({
        message: "All internships fetched",
        data: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.applyinternship = (req, res, next) => {
  const internshipId = req.body.internshipId;
  const userId = req.body.userId;
  console.log(userId, internshipId);

  Internship.findById(internshipId)
    .then((result) => {
      result.applications.forEach((application) => {
        if (application.userId === userId) {
          const error = new Error("You have already applied");
          error.statusCode = 422;
          error.data = {
            userId: userId,
          };
          throw error;
        }
      });

      const application = {
        userId: userId,
      };
      console.log(result.applications);
      console.log("abhay");
      const updatedapplications = [...result.applications, application];
      result.applications = updatedapplications;
      result.save();

      User.findById(userId)
        .then((data) => {
          const appli = {
            internshipId: internshipId,
            status: "Applied",
            internshipProfile: result.title,
            companyName: result.companyName,
          };
          console.log(data.applications);

          const updatedapplications = [...data.applications, appli];
          data.applications = updatedapplications;
          data.save();

          console.log(internshipId);
          res.status(200).json({
            message: "Applied to this internship",
            data: {
              internshipId: internshipId,
              userId: userId,
            },
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewresume = (req, res, next) => {
  const userId = req.params.userId;
  console.log(__dirname);

  User.findById(userId)
    .then((data) => {
      const resumeName = "resume-" + userId + ".pdf";

      const resumePath = path.join(__dirname, "../", "resume", resumeName);

      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(fs.createWriteStream(resumePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(22).text("Hello there , I am " + data.name, {
        underline: true,
      });

      pdfDoc.moveDown();
      pdfDoc.fontSize(18).text("Education", {
        underline: true,
      });

      pdfDoc.moveDown();
      pdfDoc.fontSize(15).text("" + data.education);
      pdfDoc.moveDown();
      pdfDoc.fontSize(18).text("Skills", {
        underline: true,
      });
      pdfDoc.moveDown();
      pdfDoc.fontSize(15).text("" + data.skills);
      pdfDoc.moveDown();
      pdfDoc.fontSize(18).text("Contact Me", {
        underline: true,
      });
      pdfDoc.moveDown();
      pdfDoc.fontSize(15).text("" + data.phone);
      pdfDoc.moveDown();
      pdfDoc.fontSize(18).text("Social media links", { underline: true });
      pdfDoc.fontSize(15).text(data.links);

      data.resume = "resume-" + userId + ".pdf";
      data.save();
      pdfDoc.end(() => {
        res.status(200).json({
          path: data.resume,
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.udateInternship = (req, res, next) => {};
