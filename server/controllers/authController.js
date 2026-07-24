import User from "../models/User.js";
import OTP from "../models/OTP.js";
import Profile from "../models/Profile.js";  
import otpGenerator from "otp-generator";
// const mailSender = require("../utils/mailSender.js");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import {OAuth2Client} from "google-auth-library"

import { generateOTP } from "../utils/generateOtp.js";
import { sendOTPEmail } from "../services/emailService.js";
import mongoose from "mongoose";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

//signup
export const signup = async (req, res) => {
    //Data fetch and validate
   const { firstName, lastName, email, password, } = req.body  // frontend mai forrgetten password nhi liye hai

    if(!firstName || !lastName || !email || !password ) { // frontend mai account type nhi liye 
    return res.status(400).json({ success: false, message: "Incomplete credentials" })
    }

    try {

        //Check existing user
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res
            .status(401)
            .json({ success: false, message: "User already exists" });
        }

        //Password hash
        const hashedPassword = await bcrypt.hash(password , 10)
         
        //DB mein entry
        const profileDetails = await Profile.create({
            gender : null ,
            contactNumber : null ,
            dateOfBirth : null ,
            about : null
        })

        const user = new User({ // yaha bhi confirmed password wla hata diye hai
        firstName, 
        lastName, 
        email, 
        password: hashedPassword,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
})
        await user.save() 

        let token = generateToken(user);

        // Set cookie
        res.cookie("token" , token  , {
            httpOnly : true ,
            secure : process.env.NODE_ENV === 'production' ,
            sameSite : process.env.NODE_ENV === 'production' ? "none" : "lax" ,
            maxAge : 7*24*60*60*1000
        })

        //Success response
        return res.status(200).json({success: true , message : "New User created successfully" , user , token})
    } 
    catch (error) {
        console.log("Issue while signup")
        return res.status(500).json({success:false , message : error.message})
    }
};

//login
export const login = async (req,res)=>{
    const {email , password} = req.body ;
    if(!email || !password){
        return res.status(400).json({success:false , message : "Incomplete credentials!"})
    }

    try{
        const user = await User.findOne({email}).populate("additionalDetails")

        if(!user){
            return res.status(401).json({success:false , message : "User not registered!"})
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
            return res.status(400).json({
                success : false ,
                message : "Incorrect Email or Password"
            })
        }

        let token = generateToken(user);

        // Set cookie
        res.cookie("token" , token  , {
            httpOnly : true ,
            secure : process.env.NODE_ENV === 'production' ,
            sameSite : process.env.NODE_ENV === 'production' ? "none" : "lax" ,
            maxAge : 7*24*60*60*1000
        })

        return res.status(200).json({
            success:true , 
            message : "Logged In Successfully!",
            token,
            user
        })
    }
    catch(err){
        return res.status(500).json({success :false, message : err.message})
    }
}

//logout
export const logout = async (req,res)=>{
    try {
        res.clearCookie("token", {
            httpOnly : true ,
            secure : process.env.NODE_ENV === 'production' ,
            sameSite : process.env.NODE_ENV === 'production' ? "none" : "lax"
        })
        return res.status(200).json({success: true, message: "Logged out successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Error while logging out"})
    }
}

//changePassword
export const changePassword  = async (req,res) =>{
    try {
        //Get data from req.body
        const {oldPassword,newPassword , confirmNewPassword} = req.body 

        //Validation
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({success:false , message : "Passwords not match"})
        }

        //find user
        const user = await User.findById(req.user.id) 
        
        if(!user){
            return res.status(400).json({success : false , message : "User not found"})
        }

        //old password check
        const isMatch = await bcrypt.compare(oldPassword , user.password)
        if(!isMatch){
            return res.status(403).json({success : false , message : "Old password is incorrect"})
        }
        //Update password in databse
        const hashedPassword = await bcrypt.hash(newPassword , 10)
        user.password = hashedPassword
        await user.save() 
        //send mail
        // await mailSender(user.email , "Password changed successfully at StudyNotion" , "Your password was changed on StudyNotion. If this was not you, reset your password immediately")
        //success response
        return res.status(200).json({success: true , message : "Password changed successfully"})

    } catch (error) {
        return res.status(500).json({success:false , message : "Issue occur while changing password"})
    }
}

//google login

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)

export const googleLogin = async(req,res)=>{

    try{
        const {code}=req.body

        console.log(code);

        const {tokens}= await client.getToken({code,redirect_uri: "postmessage"});

        console.log(tokens);

        const ticket=await client.verifyIdToken({

            idToken:tokens.id_token,
            audience:process.env.GOOGLE_CLIENT_ID,
        })

        const payload=ticket.getPayload();

        console.log(payload);


        const user=await User.findOne({
            email:payload.email
        })

        if(user){

            const token=generateToken(user)

             res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                token,
                user,
                message: "Login successful",
            });
        }

        else{

            const profileDetails = await Profile.create({
            gender: null,
            contactNumber: null,
            dateOfBirth: null,
            about: null,
            });

            const [firstName,...lastNameParts]=payload.name.split(" ");

            const lastName=lastNameParts.join(" ");

            const newUser=await User.create({firstName,lastName,email:payload.email,provider:"google",image:payload.picture,additionalDetails: profileDetails._id})

            const token=generateToken(newUser)

            res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
});

            return res.status(200).json({success:true ,token,user: newUser,message:"Authorization code exchanged successfully and Login also initiated"});

        }
    }

    catch(error){

        console.log(error);

        return res.status(500).json({success:false,message:"Authorization code exchanged failed"})

    }
}

//otp send for register

export const sendOTP= async(req,res)=>{

    try{
    const {email} = req.body;

    if (!email){

    return res.status(400).json({

        success: false,

        message: "Email is required"

    });

    }

    const existingUser=await User.findOne({email})

    if(existingUser){

        return res.status(409).json({
            success:false,
            message:"User already exists"

        })
    }

    const otpRecord= await OTP.findOne({email});

    if(otpRecord){

        const diff=Date.now()-otpRecord.lastSentAt.getTime();

        if (diff<30*1000) {

        return res.status(429).json({

            success: false,

            message: "Please wait 30 seconds before requesting another OTP."

        });

    }
    
    const otp=generateOTP(4);

    console.log("Generated OTP:", otp);
    
    const otpHash= await bcrypt.hash(otp,10)

    const expiresAt=new Date(Date.now()+5*60*1000);

    await OTP.findOneAndUpdate(

        {email},
        {otpHash,
        expiresAt,
        attempts:0
        },
        {
            upsert:true,
            new:true
        }
    )

    try{

        await sendOTPEmail(email,otp);
    }

    catch(err){

        await OTP.deleteOne({email});

        return res.status(500).json({
            success:false,
            message:"Failed to send OTP"
        })
    }

    return res.status(200).json({

        success:true,
        message:"OTP Sent successfully"

    })}

}

    catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }

}

//verifyOTP for user

export const verifyOTP=async(req,res)=>{

    try{

        const {firstName,lastName,email,password,accountType,provider}=req.body;

        if(!email || !otp){
            
            return res.status(400).json({

                success:false,
                message:"Email and otp is required"    
            });
        }

        const otpRecord=await OTP.findOne({email});

        if(!otpRecord){

            return res.status(400).json({

                success:false,
                message:"Otp not found"
            })
        }

        if(Date.now()>otpRecord.expiresAt){

            await OTP.deleteOne({email})

            return res.status(400).json({

                success:false,
                message:"Otp has expired Retry again"
            });
        }

            const isMatch=await bcrypt.compare(otp,otpRecord.otpHash);

            if(!isMatch){

                otpRecord.attempts++;
                await otpRecord.save();

                if(otpRecord.attempts>=3){

                    await OTP.deleteOne({email})

                    return res.status(400).json({

                        success:false,
                        message:"Maximum Attempts reached out! Try again"
                    });
                }

                return res.json({
                    success: false,
                    message: "Invalid OTP"
                })
            }

            if(isMatch){

                const session=await mongoose.startSession();

                session.startTransaction();

                try{

                    const hashedPassword=await bcrypt.hash(password,10)

                    await User.create([
                        {

                            firstName:otpRecord.firstName,
                            lastName:otpRecord.lastName,
                            email:otpRecord.email,
                            password:otpRecord.password,
                            accountType:otpRecord.accountType,
                            provider:otpRecord.provider

                        }
                    ],{session});

                    await OTP.deleteOne({email},{session});

                    await session.commitTransaction();
                }

                catch(err){

                    console.log(err);

                    await session.abortTransaction();
                }
            }
    }

    catch(err){

        console.log(error);

        return res.status.json({

            success:false,
            message:"Internal Server Error"
        })
    }

    finally{

    session.endSession();}
}