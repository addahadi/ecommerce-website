const { Signup, Login } = require("../controller/auth.controller");

const express = require("express")
const router = express.Router()



<<<<<<< HEAD

router.post("/signup", (req, res) => Signup(req, res));

router.post("/login", (req, res) => Login(req, res));



router.get("/status" , (req , res) => {

    if(req.session.user){
           
        res.json({ loggedIn: true, user: req.session.user });
=======
const authRoute = (req , res) => {
    if(req.method == 'POST' && req.url == "/signup"){
        register(req , res)
>>>>>>> 35c8d4d19b6e72e4190eec0eb13d010934216d6d
    }
    else{
        res.json({loggedIn : false , user : req.session.user})
    }
})


module.exports = router