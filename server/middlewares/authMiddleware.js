import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//token se data decode kr liya
export const protect = async(req,res,next)=>{
    let token ;
    const authHeader = req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
        if(!token){
            return res.status(401).json({message : "No token , authorization denied"})
        }
        try {
            const decode= jwt.verify(token , process.env.JWT_SECRET)
            req.user = decode
            next()
        } catch (error) {
            return res.status(500).json({
                success : false ,
                message : "token not valid"
            })
        }
    }
    else{
        return res.status(500).json({
            success : false ,
            message : "AuthHeader not found"
        })
    }
}

//check authorization for protected routes
export const authorizeRole = (...allowedRoles)=>{
    return (req,res,next) =>{
        if(!allowedRoles.includes(req.user.accountType)){
            return res.status(403).json({success:false , message : "Access denied"})
        }
        next()
    }
}