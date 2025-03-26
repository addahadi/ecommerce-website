const bcrypt = require("bcrypt")
const db = require("../db")
const {createSellerUser , createClientUser , loginUser} = require("../service/auth.service")


const Signup = async (req, res) => {
  try {
    const { password, username, role, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "seller") {
      const { store_name, store_logo, phone } = req.body;
      createSellerUser(
        res,
        username,
        email,
        hashedPassword,
        role,
        store_name,
        store_logo,
        phone
      );
    } else {
      createClientUser(res, username, email, hashedPassword, role);
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid body", error: err.message });
  }
}

// Login Route
const Login = async (req, res) => {
  loginUser(req,res);
}

module.exports = {Signup , Login};
