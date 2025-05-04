
const { Signup, Login , GetUserInfo , UpdateUserInfo, UpdateStoreInfo } = require("../controller/auth.controller");

const express = require("express");
const upload = require("../middleware");
const router = express.Router()



router.post("/signup", upload.single("store_logo") , (req, res) => Signup(req, res));



router.post("/login", (req, res) => Login(req, res));






router.get("/status" , (req , res) => {

    if(req.session.user){
           
        res.json({ loggedIn: true, user: req.session.user });
    }
    else {
        res.json({loggedIn : false})
    }

});






router.get("/me" , (req , res) => {
    if(!req.session.user.Id){
        return res.json({error : "not logged In"})
    }
    GetUserInfo(req , res)
    
})


router.get('/logout', (req , res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({ message: "Could not log out 😥" });
        }
        res.clearCookie('connect.sid')
        res.json({message : "successful logOut"})
    })
})



router.post("/updateuser" , (req , res) => {
    if(!req.session.user.Id){
        return res.json({error : "not logged In"})
    }
    UpdateUserInfo(req , res)    
})

router.post("/updatestore" , upload.single('image'), (req , res) => {
    if(!req.session.user.Id || !req.session.user.role == 'seller'){
        return res.json({error : "unAuth"})
    }
    UpdateStoreInfo(req , res)
})

module.exports = router