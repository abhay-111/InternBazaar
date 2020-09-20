const User=require('../models/User')
const bcryct=require('bcryptjs')
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')
const {validationResult}=require('express-validator/check')

const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))


exports.signup=(req,res,next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        const error=new Error('Validation Failed ')
        error.statusCode=422;
        error.data=errors.array();
        throw error;
    }



    const collegeName=req.body.collegeName;
    const password=req.body.password;
    const email=req.body.email;

    User.findOne({email:email}).then(result =>{
        if(result)
        {
            return res.status(401).json({
                message:'errror'
            })

        }
        bcryct.hash(password,12).then(hashedpassword =>{

            const user=new User({
                email:email,
                collegeName:collegeName,
                password:hashedpassword
            })
            user.save();
            let Otp=Math.floor(100000 + Math. random() * 900000)
            transporter.sendMail({
                to:'abhaychauhan232@gmail.com',
                from:'abhay1912052@akgec.ac.in',
                subject:'Sign up OTP',
                html:`<h1>OTP: ${Otp} </h1>`

            }).catch(err=>{console.log(err)})
            console.log(collegeName)
            res.status(200).json({
                message:'User added',
                email:email,
                collegeName:collegeName
            })

        }).catch(err =>{
            console.log(err)
        })

    }).catch(err =>{console.log(err)})


}