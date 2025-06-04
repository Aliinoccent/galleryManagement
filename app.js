const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const imageRouter=require('./routers/image.route');
const authRouter=require("./routers/auth.route");
app.use('/',imageRouter)
app.use('/',authRouter);
module.exports={app};