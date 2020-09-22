const Internship = require("../models/internship");

exports.getInternships = (req, res, next) => {
  const internshipType = req.params.internshipType;
  Internship.find({ internshipType: internshipType }).then((result) => {
    if (result.length === 0) {
      return res.status(422).json({
        message: "No such internships found",
      });
    }

    res.status(200).json({
      message: "Internships loaded",
      post: result,
    });
  });
};

exports.addInternships = (req, res, next) => {
  const internshipType = req.body.internshipType;
  const title = req.body.title;
  const description = req.body.description;
  const stipend = req.body.stipend;
  const internshipPeriod = req.body.internshipPeriod;
  const companyName = req.body.companyName;

  const internship = new Internship({
    title: title,
    description: description,
    stipend: stipend,
    internshipPeriod: internshipPeriod,
    companyName: companyName,
    internshipType: internshipType,
  });
  internship.save();

  res.status(200).json({
    message: "Internship added",
    title: title,
    description: description,
    stipend: stipend,
    internshipPeriod: internshipPeriod,
    companyName: companyName,
    internshipType: internshipType,
  });
};
