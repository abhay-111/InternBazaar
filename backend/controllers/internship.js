const Internship = require("../models/Internship");

// // adding internships to database
// exports.addInternships = (req, res, next) => {



//   const internshipType = req.body.internshipType;
//   const title = req.body.title;
//   const description = req.body.description;
//   const stipend = req.body.stipend;
//    const internshipPeriod = req.body.internshipPeriod;
//  const companyName = req.body.companyName;
//    const startDate = req.body.startDate;
//   const applyBy = req.body.applyBy;

//   const internship = new Internship({
//     title: title,
//     description: description,
//     stipend: stipend,
//     internshipPeriod: internshipPeriod,
//     companyName: companyName,
//     internshipType: internshipType,
//     applyBy: applyBy,
//     startDate: startDate,
//   });
//   internship.save();

//   res.status(200).json({
//     message: "Internship added",
//     title: title,
//     description: description,
//     stipend: stipend,
//     internshipPeriod: internshipPeriod,
//     companyName: companyName,
//     internshipType: internshipType,
//     applyBy: applyBy,
//     startDate: startDate,
//   });
// };

// listing all internships stored in database by type
exports.getInternships = (req, res, next) => {
  console.log(req.query)
  
  const query=req.query
   const search=Object.keys(query)[0]
   var value=Object.values(query)[0]
   
  
  //  const  value=req.query.val
   console.log(search,value)
    Internship.find({ internshipType: `${value}`}).then((result) => {
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
