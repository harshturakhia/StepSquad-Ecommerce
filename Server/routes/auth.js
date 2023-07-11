const express = require('express')
const router = express.Router();
const User = require('../model/User.js')
const CryptoJS = require('crypto-js')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()


//Register
router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString()
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
})


//Login
router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })

        !user && res.status(401).json("Wrong Credentials!")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY)

        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password && res.status(401).json("Wrong Password!")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
        )

        const { password, ...others } = user._doc;
        res.status(200).json({ others, accessToken });
    }

    catch (error) {
        res.status(500).json(error);
        // console.log(error);
    }
})

module.exports = router;
