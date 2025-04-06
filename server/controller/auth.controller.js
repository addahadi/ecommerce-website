const bcrypt = require("bcrypt")
const db = require("../db")
const {createSellerUser , createClientUser , loginUser} = require("../service/auth.service")


const Signup = async (req, res) => {
  try {
    const { password, username, role, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role == "seller") {
      const { store_name, store_logo, phone } = req.body;
      console.log(req.body);

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

const GetUserInfo = async (req , res) => {
  const query = ' SELECT username , email , pssword FROM user WHERE userId = ?'
  db.query(query , [req.session.user.id] , (err , result) => {
    if(err){
      return res.status(200).json({error : err})
    }
    res.status(200).json(result[0])
  })  
}

const UpdateUserInfo = async (req , res) => {
  try {
    const {username,email,password} = req.body;
    const fields = []
    const values = []
    if(email){
      fields.push('email = ?')
      values.push(email)
    }
    
    if(username){
      fields.push("username = ?")
      values.push(username)
    }
    
    if(password){
      const hashedPassword =  await bcrypt.hash(password, 10);
      fields.push("pssword = ?")
      values.push(hashedPassword)
    }
    const query = `UPDATE user SET ${fields.join(', ')} WHERE userId = ?`
    values.push(req.session.user.id)
    db.query(query , values , (err , result) => {
      if(err){
        return res.json({error : err})
      }
      res.status(200).json({ message: "Profile updated successfully" });
    })

  }
  catch(err){
    console.log(err)
  }
}

module.exports = {Signup , Login , GetUserInfo , UpdateUserInfo};
