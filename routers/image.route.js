const express = require('express');
const app = express.Router();
const maincontroler = require("../controllers/index.controller")
const upload = require("../middleware/multer");
const { authentication } = require('../middleware/jwt.authentication')



app.post('/url', authentication, upload.single('image'), maincontroler.imagePost);
app.get("/allimages", authentication, maincontroler.getAllimages)
app.put("/update/:id", authentication, upload.single('image'), maincontroler.updateimage);
app.delete('/delete/:id', authentication, maincontroler.deleteImage)
module.exports = app