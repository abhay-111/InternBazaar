const Internship = require("../models/Internship");

// // adding internships to database
exports.addInternships = (req, res, next) => {


  // const skillreq=req.body.skillsReq
  const internshipType = req.body.internshipType;
  const title = req.body.title;
  const description = req.body.description;
  const stipend = req.body.stipend;
  const internshipPeriod = req.body.internshipPeriod;
  const companyName = req.body.companyName;
  const startDate = req.body.startDate;
  const applyBy = req.body.applyBy;
  const vacancy=req.body.vacancy;
  const skillsReq=req.body.skillsReq


  const internship = new Internship({
    vacancy:vacancy,
    skillsReq:skillsReq,
    title: title,
    description: description,
    stipend: stipend,
    internshipPeriod: internshipPeriod,
    companyName: companyName,
    internshipType: internshipType,
    applyBy: applyBy,
    startDate: startDate,
  });
  internship.save()
    
  res.status(200).json({
    message: "Internship added",
    title: title,
    description: description,
    stipend: stipend,
    internshipPeriod: internshipPeriod,
    companyName: companyName,
    internshipType: internshipType,
    applyBy: applyBy,
    startDate: startDate,


  })




};


exports.getInternships = (req, res, next) => {

  
     
    Internship.find(req.query).then((result) => {
      if (result.length === 0) {
        return res.status(422).json({
        message: "No such internships found",
        });
      }
     

      res.status(200).json({
        message: "Internships loaded",
        post: result,
      });
    }).catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });


   

};
