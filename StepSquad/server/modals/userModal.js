const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const crypto=require("crypto");


const userSchema=new mongoose.Schema({
    name:{
        type: 'String',
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name can't exceed 30 Characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type: 'String',
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid Email"]
    },
    password:{
        type: 'String',
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password must be at least 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type: String,
            required:true
        },
        url:{
          type: String,
          required:true
      },
     
  
    },
    role:{
        type: String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
   

    resetPasswordToken:String,
    resetPasswordExpire:Date,
})


// BCRYPT THE PASSWORD WHENEVER UPDATION OR FIRST TIME REGISTER
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

// COMPARE PASSWORD
userSchema.methods.comparepassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// FORGOT PASSWORD(GENERATING PWD RESET TOKEN)
userSchema.methods.getResetPasswordToken=function(){

    // GENERATING TOKEN
    const resetToken=crypto.randomBytes(20).toString("hex");
    

    // HASHING AND ADD TO USERSCHEMA(HEX_HASH AND UPDATE)
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
   

    // EXPIRE RESET FACILITY AFTER 15MIN
    this.resetPasswordExpire=Date.now() +15*60*1000

    return resetToken;
}

module.exports=mongoose.model("User",userSchema)