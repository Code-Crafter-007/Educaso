import mongoose from "mongoose" ;

const userSchema = new mongoose.Schema({
    firstName :{
        type : String ,
        required : true ,
        trim : true
    },
    lastName :{
        type : String ,
        required : true ,
        trim : true
    },
    email :{
        type : String ,
        required : true ,
        unique : true ,
        trim : true
    },
    password :{
        type : String ,
        required : true ,
    },
    accountType :{
        type : String ,
        enum : ["Admin" , "Student" , "Instructor"] ,
        required : true
    },
    token : String ,
    resetPasswordExpires : {
        type : Date
    },
    additionalDetails :{
        type : mongoose.Schema.Types.ObjectId ,
        required : true ,
        ref : "Profile"
    },
    courses :[
        {
           type : mongoose.Schema.Types.ObjectId ,
            required : true ,
            ref : "Course" 
        }
    ],
    image :{
        type : String 
    },
})

export default mongoose.model("User" , userSchema) ;