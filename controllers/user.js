const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
// const cloudinary = require('cloudinary').v2;
// const { response } = require("express")



require('dotenv').config();



const signUp = async (req, res) => {
    // get user validate input
    const { business_name, email, password } = req.body;
    try {
        if (!(business_name, password, email)) {
            return res.status(400).send("Kindly fill all required input")
        }


        //check if user already exist
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // console.log(existingUser)
            return res.status(409).send("User with this email already exist")
        } else {


            // if (password != confirmPassword) {
            //     return res.status(400).send("password doestn't match")
            // }

            //Encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 10)

            //add user to DB
            const user = await User.create({
                business_name,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            //create a   token
            const token = jwt.sign({
                user_id: user._id,
                email
            },
                process.env.TOKEN_KEY
            )

            user.token = token

            // await sendOTPVerificationMail(user, res)
            res.status(201).json({
                user,
                token,
                message: "User created successfully",
                status_code: 201
            })

        }

    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
            status_code: 400
        })
    }

}


const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // validate
        if (!(email && password)) {
            return res.status(400).send("Kindly fill all input")
        }

        //get user
        const user = await User.findOne({ email })
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY
                )
                user.token = token
                res.status(200).json({
                    user, token,
                    message: "Login Successfull",
                    status_code: 200
                })
            } else {
                res.status(400).send("password Incorrect")
            }
        } else {
            res.status(404).send("No account with this email")
        }

    } catch (error) {
        res.json({
            status: "FAILED",
            status_code: 400,
            message: error.message
        })
    }

}

module.exports = { login, signUp }