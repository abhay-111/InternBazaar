const login=require('../controllers/login')
const express = require('express');
const router=express.Router();

router.post('/login',login.login)



module.exports=router