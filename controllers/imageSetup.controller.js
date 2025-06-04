
const cloudinary = require("../config/cloudinary");
const imageModle = require("../models/image")
const Redis = require('ioredis');
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
});


exports.imagePost = async (req, res) => {
    const image = req.file
    const {userId}=req.user;
    try {
        if(!image){
            return res.status(400).json({messege:"image url required"});
        }
        const cloudObj = await cloudinary.uploader.upload(image.path, { resource_type: "image", chunk_size: 1 * 1024 * 1024 });
        console.log(cloudObj);
        redis.set('imageData','')
        await imageModle.create({ url: cloudObj.secure_url,user:userId });
        res.status(200).json({ url: cloudObj.secure_url ,user:userId});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
exports.getAllimages = async (req, res) => {
    try {
        const {userId}=req.user;
        console.log(userId);
        const imageData = await imageModle.find({user:userId});
        if (!imageData) {
            return res.status(400).json({ messege: "not image found" });
        } 
        const redisData = await redis.get('imageData');
        console.log(redisData);
        
        if (redisData) {
            const parseData = JSON.parse(redisData);
            console.log('data from redis')
            return res.status(200).json({ messege: parseData });
        }
        console.log('data from db');
        const stringData = JSON.stringify(imageData);
        redis.set('imageData', stringData);
        return res.status(200).json({ messege: imageData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
exports.updateimage = async (req, res) => {
    try {
        const {userId}=req.user;
        const {id} = req.params;
        const image = req.file;
        if (!image) {
            return res.status(401).json({ messege: "image url required" });
        }
        const isImage = await imageModle.findById({ user: userId, _id:id });
        if (!isImage) {
            return res.status(404).json({ messege: "not found url" });
        }
        console.log(isImage, 'image here');
        const imgObj = await cloudinary.uploader.upload(image.path, { resource_type: "image", chunk_size: 1 * 1024 * 1024 });
        redis.set('imageData','')
        await imageModle.updateOne({ _id: id }, { $set: { url: imgObj.secure_url } });
        return res.status(200).json({ messege: "update image successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
exports.deleteImage = async (req, res) => {
    const { id } = req.params;
    try {
        const {userId}=req.user;
        const isImage = await imageModle.findOne({$and  : [{user:userId},{ _id:id}]});
        if (!isImage) {
            return res.status(404).json({ messege: "not found image" });
        }
        await imageModle.deleteOne({ _id: id });
        redis.set('imageData','')
        return res.status(200).json({ messege: "image delete successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}