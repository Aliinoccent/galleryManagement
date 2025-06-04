const db=require("./config/db");
const {app}=require("./app");
require('dotenv').config();
const port = process.env.PORT||5000;
db();
app.listen(port,()=>{
    console.log('port is liten',port);
})