const mongoose=require('mongoose');


const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{type:String,require:true},
        city:{type:String,require:true},
        state:{type:String,require:true},
        country:{type:String,require:true},
        pinCode:{type:Number,require:true},
        phoneNo:{type:Number,require:true},
    },
    orderItems:[
        {
            name:{type:String,require:true},
            price:{type:Number,require:true},
            quantity:{type:Number,require:true},
            image:{type:String,require:true},
            product:{type:mongoose.Schema.ObjectId,ref:"Product",required:true}
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
      },
    paymentInfo:{
        id:{type:String,require:true},
        status:{type:String,require:true},
    },
    paidAt:{type:Date,required:true},
    itemPrice:{type:Number,default:0,required:true},
    taxPrice:{type:Number,default:0,required:true},
    shippingPrice:{type:Number,default:0,required:true},
    totalPrice:{type:Number,default:0,required:true},
    orderStatus:{type:String,required:true,default:"Processing"},
    deliveredAt:Date,
    createdAt:{type:Date,default:Date.now}

});

module.exports=mongoose.model("Order",orderSchema)