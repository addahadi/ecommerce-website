const express = require("express");
const router = express.Router();


const {addWishlist , getWishlist , delWishlist , getWishlists} = require("../controller/wishlist.controller")




router.post("/addWishlist", async (req, res) => {
  if(!req.session.user){
    return res.json({message : "you are not autherised"})
  }
  addWishlist(req , res)
});



router.get("/getwishlists" , (req , res) => {
    if(!req.session.user){
        return res.json({ message: "you are not autherised" });
    }
    getWishlists(req , res)
})



router.get("/get" , (req , res) => {
  if(!req.session.user){
    return res.json({message : "you are not autherised" , showUp : false})
  }
  getWishlist(req , res)
})



router.post("/delWishlist" , (req , res) => {
    if(!req.session.user.Id){
        res.json({message : "you are not autherized"})
    }
    delWishlist(req , res)
})

module.exports = router
