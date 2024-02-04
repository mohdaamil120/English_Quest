const express = require("express")
const { UserModel } = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const userRouter = express.Router()


userRouter.post("/register", async(req,res) => {
    const {role,name, email, password} = req.body
    try {
        if( !name || !email || !password){
            return res.status(400).send({"msg":"all fields mandatory"})
        }
        else {
            const isPresent = await UserModel.findOne({email})
            if(isPresent){
                return res.status(400).send({"msg":"user is already present"})
            }
            else {
                bcrypt.hash(password,5,(err,hash)=>{
                    if(err) {
                        res.status(400).send({"msg":"something wrong in bcrypt"})
                    }
                    else{
                        const user = new UserModel({role,name,email,password:hash})
                        user.save()
                        res.status(200).send({"msg":"A new user has been registerd"})     
                    }
                })
            }
        }
    } 
    catch (err) {
        res.status(401).send({"msg":"something wrong in catch block for user"})
    }
})

userRouter.post("/login", async(req,res) => {
    const {email, password} = req.body
    try {

        if( !email || !password){
            return res.status(400).send({"msg":"all fields mandatory"})
        }
        else{
            const user = await UserModel.findOne({email})
            if(!user) {
                return res.status(202).send({"msg":"Please Register first"})
            }
            else{
                bcrypt.compare(password, user.password, (err,result) => {
                    if(result){
                        const token = jwt.sign({userID:user._id, name:user.name, role:user.role},process.env.secretKey,{expiresIn:"1d"})
                        res.status(200).send({"msg":"Login Successfull!", "token":token})
                    } else {
                        res.status(200).send({"msg":"Wrong Credentials"})
                    }
                })
            }
        }
    } catch (err) {
        res.status(400).send({"msg":"error in login catch", err} )
    }
})

module.exports={
    userRouter
}
