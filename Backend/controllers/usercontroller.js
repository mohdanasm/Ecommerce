import userModel from "../models/usermodel.js";
import validator from "validator"
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createtoken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginuser = async (req,res)=>{
    try {
        
        const {email, password} = req.body;

        //checking user already exists or not
         const user = await userModel.findOne({email})
         if (!user) {
            return res.json({success:false, message:"User does not Exists"})
         }

         const ismatch = await bycrypt.compare(password, user.password)

         if (ismatch) {
            
            const token = createtoken(user._id)
            res.json({success:true,token})

         }

        else{
            res.json({success:false, message:"Ivalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }

}


//Route for user register
const registeruser = async (req,res)=>{

    try {
        
         const {name, email, password} = req.body;

         //checking user already exists or not
         const exists = await userModel.findOne({email})
         if (exists) {
            return res.json({success:false, message:"User already Exists"})
         }

        //validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please Enter a valid Email"})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please Enter a Strong Password"})
        }

        //hashing user password
        const hashpass = await bycrypt.hash(password,10)

        const newUser = new userModel({
            name,
            email,
            password:hashpass
        })

        const user = await newUser.save()

        const token = createtoken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
        
    }
}

//Route for user adminlogin
const adminlogin = async (req,res)=>{

    try {

        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }

}


export {loginuser,registeruser,adminlogin}