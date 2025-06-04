const mongoose=require("mongoose");
const imageSchema=mongoose.Schema({
    url:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},)
const imageModel=mongoose.model('image',imageSchema);
module.exports=imageModel
