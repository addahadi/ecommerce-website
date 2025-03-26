const { Signup, Login } = require("../controller/auth.controller");

const express = require("express")
const router = express.Router()




router.post("/signup", (req, res) => Signup(req, res));

router.post("/login", (req, res) => Login(req, res));



router.get("/status" , (req , res) => {

    if(req.session.user){
           
        res.json({ loggedIn: true, user: req.session.user });
    }
    else{
        res.json({loggedIn : false , user : req.session.user})
    }
})


module.exports = router