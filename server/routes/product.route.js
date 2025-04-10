
const express = require("express")
const router = express.Router()
const {addNewProduct , getProduct} = require("../controller/product.controller")

const upload = require("../middleware")





router.post('/add' , upload.array("images") ,(req , res) => {
    if(req.session.user && req.session.user.role == "seller"){
        addNewProduct(req , res)
        
    }

    else {
        return res.json({message: "you are unAuth" });
    }
})

router.get('/get',(req , res) => {
    if(req.session.user){
        getProduct(req , res)
        
    }
    else {
        return res.json({message: "you are unAuth" });
    }
})


module.exports = router;