
const express=require('express');
const app=express.Router();
const userValidation=require('../middleware/joi.validate')
const maincontroler=require('../controllers/index.controller')
app.post("/signup",userValidation,maincontroler.signUp);
app.post("/login",maincontroler.signIn)

module.exports=app