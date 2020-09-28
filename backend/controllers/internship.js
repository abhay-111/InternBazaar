const Internship = require("../models/Internship");
const { validationResult } = require("express-validator/check");


// // adding internships to database
exports.addInternships = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    
    return req.status(422).json({
      data:errors.array(),
      msg:"validation failed"
    })
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
  const vacancy=req.body.vacancy;
  const skillsReq=req.body.skillsReq
  const perks=req.body.perks
  const whocanApply=req.body.whocanApply
  var location =req.body.location
  location=String(location).toLowerCase()
  internshipType=String(internshipType).toLowerCase()

  const internship = new Internship({
    location:location,
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
    whocanApply:whocanApply,
    perks:perks
  });
  internship.save();
    
  res.status(200).json({
    message: "Internship added",
    perks:perks,
    whocanApply:whocanApply,
    title: title,
    description: description,
    stipend: stipend,
    internshipPeriod: internshipPeriod,
    companyName: companyName,
    internshipType: internshipType,
    applyBy: applyBy,
    startDate: startDate,
    location:location
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


exports.viewinternship=(req,res,next)=>{

  const internshipId=req.params.internshipId;
  console.log(typeof(internshipId))

  Internship.findById(internshipId).then((data)=>{
console.log('ABHAY',data)
    if(!data)
    {
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
      message:"Internship Found",
      data:data,
    })



  }).catch((err) => {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });





}