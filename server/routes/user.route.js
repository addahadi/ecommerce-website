const { Signup, Login , GetUserInfo , UpdateUserInfo } = require("../controller/auth.controller");

const express = require("express")
const router = express.Router()



router.post("/signup", (req, res) => Signup(req, res));

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
    if(!req.session.user.id){
        return res.json({error : "not logged In"})
    }
    console.log(req.session.user.id)

    GetUserInfo(req , res)
    
})



router.post("/update" , (req , res) => {
    if(!req.session.user.id){
        return res.json({error : "not logged In"})
    }
    console.log(req.body)
    UpdateUserInfo(req , res)    
})

module.exports = router