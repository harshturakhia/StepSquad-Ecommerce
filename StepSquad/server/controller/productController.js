const Product=require("../modals/productModal");
const catchAsyncError=require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apiFeatures");


// CREATE PRODUCT ----ADMIN
exports.createProduct = catchAsyncError(async (req,res,next)=>{
    req.body.user=req.user.id
    const product=await Product.create(req.body);
    res.status(201).json({success:true,product});
})

// GET ALL PRODUCTS
exports.getAllProducts=catchAsyncError(
    async(req,res,next)=>{
        
        const resultPerPage=8;
        const productCount=await Product.countDocuments();
        const apifeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);

        // let products=await apifeature.query;
        // let filteredProductsCount=products.length;
        

       const  products=await apifeature.query;
        res.status(200).json(
            {success:true,products,productCount,resultPerPage}
            )
    }
)

// UPDATE PRODUCT ---ADMIN
exports.updateProduct=catchAsyncError(async(req,res)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("PRODUCT NOT FOUND",404))
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({success:true,product})
})

// DELETE PRODUCT---ADMIN
exports.deleteProduct=catchAsyncError(async(req, res)=>{
    const product=await Product.findOneAndDelete(req.params.id);
    if(!product){
        return next(new ErrorHandler("PRODUCT NOT FOUND",404))
    }
 
    res.status(200).json({success:true,message:"Product Deleted"})
}
)
// GET SINGLE PRODUCT DETAIL
exports.getSingleProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler("PRODUCT NOT FOUND",404))
    }
    res.status(200).json({success:true,product})

})

// CREATE NEW REVIEW OR UPDATE THE REVIEW
exports.createProductReview=catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review = {
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product=await Product.findById(productId);
    const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){

                (rev.rating=rating),
                (rev.comment=comment);
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }

    let avg=0;
    product.ratings=product.reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    product.ratings=avg/product.reviews.length;
   

    await product.save({validateBeforeSave:false});

    res.status(200).json({success:true})
})

// GET ALL REVIEWS OF A PRODUCT
exports.getProductReviews=catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    res.status(200).json({success:true,reviews:product.reviews})
})

// DELETE REVIEW
exports.deleteReview=catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    const reviews=product.reviews.filter((rev)=>rev._id.toString()!== req.query.id.toString())

    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    
    const ratings=avg /reviews.length;
    console.log(reviews.length);

    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{reviews,ratings,numOfReviews},{new:true,runValidators:true,useFindAndModify:false})

    res.status(200).json({success:true,message:"Review Deleted"})
})