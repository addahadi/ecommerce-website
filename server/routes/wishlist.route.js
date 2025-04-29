const express = require("express");
const router = express.Router();


const {addWishlist , getWishlist , delWishlist} = require("../controller/wishlist.controller")




router.post("/addWishlist", async (req, res) => {
  if(!req.session.user){
    return res.json({message : "you are not autherised"})
  }
  addWishlist(req , res)
});



router.get("/getWishlist" , (req , res) => {
    if(!req.session.user){
        return res.json({ message: "you are not autherised" });
    }
    getWishlist()
})




router.delete("/wishlist/:id" , (req , res) => {
    const userId = req.params.id
    if(req.session.user.Id != userId){
        res.json({message : "you are not autherized"})
    }

})

module.exports = router
