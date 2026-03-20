import User from "../models/User.js";
// import OTP from "../models/OTP.js";
import Profile from "../models/Profile.js";  
import otpGenerator from "otp-generator";
// const mailSender = require("../utils/mailSender.js");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

//send OTP
// export const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User already exists" });
//     }

//     let otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     // Ensure OTP is unique
//     let isOtpExists = await OTP.findOne({ otp: otp });
//     while (isOtpExists) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//       });
//       isOtpExists = await OTP.findOne({ otp: otp });
//     }

//     // Create OTP entry - email will be sent via pre-save middleware
//     const newOTP = await OTP.create({
//       email,
//       otp,
//     });

//     console.log("OTP generated for:", email)

//     return res
//       .status(200)
//       .json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     console.log("Send OTP Error:", error)
//     return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." })
//   }
// };

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
        //find OTP
        // const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1)
        // //OTP verification
        // if(!recentOtp){
        //     return res.status(400).json({
        //         success : false ,
        //         message : "OTP not Found"
        //     })
        // }
        
        // else if(otp !== recentOtp.otp){
        //     return res.status(400).json({
        //         success : false ,
        //         message : "Invalid OTP"
        //     })
        // } 

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

        let token = jwt.sign({id : user._id , email: user.email, accountType : user.accountType} , process.env.JWT_SECRET , {expiresIn : '7d'})

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

        let token = jwt.sign({id : user._id , email: user.email, accountType : user.accountType} , process.env.JWT_SECRET , {expiresIn : '7d'})

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
