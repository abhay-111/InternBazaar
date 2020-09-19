const User=require('../models/User')
const bcryct=require('bcryptjs')
exports.login=(req,res,next)=>{

    const collegeName=req.body.collegeName;
    const password=req.body.password;
    const email=req.body.email;

    User.findOne({email:email}).then(result =>{

        console.log(result)

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