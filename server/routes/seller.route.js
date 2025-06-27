const express = require('express');
const router = express.Router();

const { getSellerById, getSellerProducts } = require('../controller/seller.controller');


router.get("/getinfo/:sellerId" , (req , res) => {
    getSellerById(req, res);
})


router.get("/getproducts/:sellerId" , (req , res) => {
    getSellerProducts(req , res)
})



module.exports = router;