const mongoose = require('mongoose');
const { schema } = require('./User');

const Schema=mongoose.Schema;

const InternshipSchema=new Schema({

    title:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true


    },
    applyBy:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
       
    ,
    stipend:{
        type:Number,
        required:true
    },
    internshipPeriod:{
        type:String,
        required:true
    },
    
    companyName:{
        type:String,
        required:true
    },
    internshipType:{
        type:String,
        required:true
    },
    skillsReq:{
        type:String,
        required:true
    },
    vacancy:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('Internship',InternshipSchema)