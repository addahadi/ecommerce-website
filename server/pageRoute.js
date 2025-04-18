const express = require("express")
const path = require("path"); 

const router = express.Router()


router.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontEnd/pages/main.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontEnd/pages/register.html"));
});

router.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontEnd/pages/profile.html"));
});

router.get("/product/:productId", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontEnd/pages/product.html"));
});





module.exports = router