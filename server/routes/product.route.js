
const express = require("express")
const router = express.Router()
const {addNewProduct , getProduct , getProducts} = require("../controller/product.controller")

const upload = require("../middleware")





router.post('/add' , upload.array("images") ,(req , res) => {
    if(req.session.user && req.session.user.role == "seller"){
        addNewProduct(req , res)
        
    }

    else {
        return res.json({message: "you are unAuth" });
    }
})


router.post('/rate' , (req , res) => {
    const {productId , rating , userId} = req.body;
    const query = `INSERT INTO product_ratings (userId, productId, rating)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE rating = ?, updated_at = CURRENT_TIMESTAMP;`

    db.query(query , [userId , productId , rating , rating] , (err) => {
        if(err){
            return res.json({message : "failed to rate"})
        }
        res.json({message : "successful rate"})
    })
})



router.get('/getall',(req , res) => {
        getProducts(req , res)
})


router.get('/get' , (req , res) => {
    getProduct(req , res)
})

module.exports = router;