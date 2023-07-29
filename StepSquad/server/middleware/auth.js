const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken");
const User=require("../modals/userModal");
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{

    
    const {token}=req.cookies;
    console.log("Auth:",token); 
    if(!token){
        return next(new ErrorHandler("Please LogIn to access this resource",401))
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id);

    next();

})

exports.authorizedRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `Role:${req.user.role} is not allowed to access this resource`,403
                )
            );
        }
        next();
    };
        

}