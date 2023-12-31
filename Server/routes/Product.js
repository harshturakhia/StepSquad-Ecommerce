const express = require('express')
const router = express.Router();

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken.js');
const Product = require('../model/Product.js')

//Create
router.post('/', verifyTokenAndAdmin, async (req, res) => {

    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(501).json(error)
    }
})

//Update 
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        )
        res.status(200).json(updatedProduct)
    }

    catch (error) {
        res.status(500).json(error)
    }

})


//Delete 
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(201).json('Product deleted')
    }
    catch (error) {
        res.status(401).json(error)
    }
})


//GET 
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL USER
router.get('/', async (req, res) => {

    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        }
        else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        }
        else {
            products = await Product.find();
        }

        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json(error)
    }
})


// //GET USER STATS
// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {

//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try {
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 },
//                 },
//             },
//         ]);
//         res.status(200).json(data)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


module.exports = router;