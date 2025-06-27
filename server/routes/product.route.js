
const express = require("express")
const router = express.Router()
const {addNewProduct , getProduct , getProducts , rateProduct 
    , getRating 
    , filterProduct 
    , GetTopPhone
    , getLowerComputers 
    , getRecommendedList
    , sendNotification
} = require("../controller/product.controller")

const upload = require("../middleware")





router.post('/add' , upload.array("images") ,(req , res) => {
    console.log(req.body)
    if(req.session.user && req.session.user.role == "seller"){
        addNewProduct(req , res)
        
    }

    else {
        return res.json({message: "you are unAuth" });
    }
})


router.post('/rate' , (req , res) => {
    if(!req.session.user){
       return res.json({error : "you are not allowed to rate"});
    }
    rateProduct(req , res)
})


router.post('/getrating' , (req , res) => {
    getRating(req , res)
})


router.get('/getall',(req , res) => {
        getProducts(req , res)
})


router.get('/searchproduct' , (req , res) => {
    filterProduct(req , res);
})

router.get('/getlowercomputer', (req ,res) => {
    getLowerComputers(req , res)
})



router.get('/gettopphone',(req , res) => {
    GetTopPhone(req , res)

})


router.get("/getrecommendedlist/:productId", (req, res) => {
    getRecommendedList(req , res)
});


router.post("/message" , (req , res) => {
    sendNotification(req , res)
})


router.post('/get' , (req , res) => {
    getProduct(req , res)
})

module.exports = router;