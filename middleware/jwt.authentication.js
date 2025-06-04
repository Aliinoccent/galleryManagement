const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user")
exports.authentication = async (req, res, next) => {
    try {
        const headers = req.headers['authorization']
        const token = headers && headers.split(' ')[1]

        if (!token) {
            res.status(403).json({ messege: "token denied" });
        }
        const verifyUser = jwt.verify(token, process.env.Secretkey);
        req.user = verifyUser;
        console.log(verifyUser)
        next();



    } catch (error) {
        res.status(500).json({ error })
    }

}
