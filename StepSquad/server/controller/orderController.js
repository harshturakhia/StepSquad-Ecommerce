const Order=require("../modals/orderModal");
const Product=require("../modals/productModal");
const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

// CREATE NEW ORDER
exports.newOrder=catchAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body
    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(201).json({success:true,order})
})

// GET SINGLE ORDER--ORDER DETAILS
exports.getSingleOrder=catchAsyncError(async(req, res, next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not Found",404));
    }

    res.status(200).json({success:true,order})
})

// GET ORDER DETAILS OF LOGEDIN PERSON
exports.myOrders=catchAsyncError(async(req, res, next)=>{
    const order=await Order.find({user:req.user._id})

   

    res.status(200).json({success:true,order})
})

// GET ALL ORDER DETAILS ---ADMIN
exports.allOrders=catchAsyncError(async(req, res, next)=>{
    const order=await Order.find()

   let totalAmount=0;
   order.forEach(order=>{
       totalAmount+=order.totalPrice;
   })

    res.status(200).json({success:true,order,totalAmount})
})

// UPDATE ORDER STATUS ---ADMIN
exports.updateOrder=catchAsyncError(async(req, res, next)=>{
    const order=await Order.findById(req.params.id)
    
    if(!order){
        return next(new ErrorHandler("Order not found",404));
    }
    if(order.orderStatus==='Delivered'){
        return next(new ErrorHandler("You have already delieverd this order",400));
    }
    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    });
    
    order.orderStatus=req.body.status;
    if(req.body.status==='Delivered'){
        order.deliveredAt=Date.now()
    }

    await order.save({validateBeforeSave:false});
    res.status(200).json({success:true,order});
});

async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.Stock-=quantity

    await product.save({validateBeforeSave:false});
}


// DELETE ORDER--ADMIN
exports.deleteOrder=catchAsyncError(async(req, res, next)=>{
    const order=await Order.findByIdAndDelete(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order not found",404));
    }
    
    res.status(200).json({success:true});
});