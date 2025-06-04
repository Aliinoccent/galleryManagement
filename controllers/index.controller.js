const {signUp,signIn}=require('./auth.controller');
const {imagePost,getAllimages,updateimage,deleteImage}=require('../controllers/imageSetup.controller');
module.exports={
    signUp,
    signIn,
    imagePost,
    getAllimages,
    updateimage,
    deleteImage
}