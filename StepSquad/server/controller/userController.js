const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const sendEmail=require("../utils/sendEmail");
const User=require("../modals/userModal");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto")
const cloudinary = require("cloudinary");

// REGISTER A USER
exports.registerUser=catchAsyncError(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })
    
    
    sendToken(user,201,res);
})

// LOGIN USER
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;

    // CHECKING IF USER HAS GIVEN PWD ND EMAIL BOTH
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched=await user.comparepassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
})

// LOGOUT USER
exports.logout=catchAsyncError((req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({success:true,message:"LOGOUT"})
})

// FORGOT PASSWORD
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
     const user= await User.findOne({email:req.body.email});

     if(!user){
         return next(new ErrorHandler("User not Found"),404);
     }

    //  GET RESET PWD TOKEN
    const resetToken=user.getResetPasswordToken();
   

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message=`Your Password Reset Token is :\n\n ${resetPasswordUrl}\n\n If you have not requested this email then please ignore it`;

    try{

    await sendEmail({
        email:user.email,
        subject:"SS Password Recovery",
        message:message
    });

    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`
    })
        
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500))

    }
})


// RESET PASSWORD 
exports.resetPassword=catchAsyncError(async(req, res, next)=>{

    // CREATE TOKEN HASH
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });

    if(!user){
        return next(new ErrorHandler(`Reset Password Token has been expired`,400));
    }

    if(req.body.password!==req.body.confirmpassword){
        return next(new ErrorHandler(`Password Does not match`,400));
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();

    sendToken(user,200,res);


})

// GET USER DETAILS
exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({success:true,user});
})

// UPDATE PASSWORD
exports.updatePassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparepassword(req.body.oldpassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }

    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.newpassword;
    await user.save()

    sendToken(user,200,res);
})

// UPDATE USER PROFILE
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

// GET ALL USERS
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({success:true,users})
})

// GET ALL USERS DETAIL__(ADMIN WANTS)
exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id:${req.params.id}`));
    }

    res.status(200).json({sucess:true,user})
})

// ROLE UPDATION--(ADMIN)
exports.updateUserRole=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{new:true,runValidators:true,useFindAndModify:false})
    if(!user){
        return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`))
    }

   res.status(200).json({success:true,user});
})

// DELETE USER(ADMIN)
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOneAndDelete(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`));
    }

   

   res.status(200).json({success:true});
})