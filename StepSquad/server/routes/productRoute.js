const express=require("express");
const { getAllProducts,createProduct, updateProduct,deleteProduct,getSingleProduct, createProductReview, getProductReviews, deleteReview } = require("../controller/productController");
const { isAuthenticatedUser ,authorizedRoles} = require("../middleware/auth");

const router=express.Router();

router.route("/products").get( getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct);
router.route("/products/:id").get(getSingleProduct);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);




module.exports=router;