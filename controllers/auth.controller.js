const User = require('../models/user');
const { LoginToken } = require("../utility/jwt");
const { hashingPassword ,varifyPass} = require('../utility/hash')

exports.signUp = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        const alreadyExist = await User.findOne({ email })
        // authloger.error("already exist");
        console.log("alreadyExist", alreadyExist)


        if (alreadyExist) {
            return res.status(404).json({ message: "user already exist" })
        }

        const createHashPassword = await hashingPassword(password)
        console.log("cratedHassPassword", createHashPassword);


        const UserData = await User.insertOne({ email, password: createHashPassword, fullName });
        // authloger.info("user created succcssfully");
        return res.status(200).json(UserData);

    } catch (error) {
        // authloger.error("Server error",error);
        res.status(500).json({ message: error })
    }
}
exports.signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        console.log("sginin controller")
        console.log("signin run", email, password)
        if(!email|| !password){
            return res.status(404).json({messege:"all field required"})
        }
        const user = await User.findOne({ email });
        if (!user) {
            // authloger.error("email not exist");
            return res.status(400).json({ message: "email not exist" });
        }
        // const hashPassword=emailAlready.password;

        const verifyPassword = await varifyPass(password, user.password)
        console.log(verifyPassword);
        if (verifyPassword) {
            //user is enable or active statusc


            const token = LoginToken({ email, userId: user._id });
            await User.updateOne({ email }, { $set: { token } })
            console.log(token);
            // authloger.info("user signin succcssfully");
            return res.status(200).json({ messege: "login successfully", token: token });


        }
        // authloger.error("password is not metch");
        return res.status(400).json({ message: "password is not match" });


    } catch (error) {
        // authloger.error("Server error",error);
        res.status(500).json({ error: error.message })
    }
}