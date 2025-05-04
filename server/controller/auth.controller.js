const bcrypt = require("bcrypt")
const db = require("../db")
const {createSellerUser , createClientUser , loginUser} = require("../service/auth.service")


const Signup = async (req, res) => {
  try {

    const { password, username, role, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role == "seller") {
      const { store_name , phone } = req.body;
      const storeLogoFile = req.file

      createSellerUser(
        res,
        username,
        email,
        hashedPassword,
        role,
        store_name,
        storeLogoFile,
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
  const query = ' SELECT username , email , pssword , role FROM user WHERE userId = ?'
  db.query(query , [req.session.user.Id] , (err , result1) => {
    if(err){
      return res.status(200).json({error : err})
    }
    if(result1[0].role == "seller"){
      const sellerId = req.session.user.Id;
      
      const query = 'SELECT store_name , store_logo , phone_number FROM seller WHERE user_id = ?'
      db.query(query , [sellerId] , (err , result2) => {
        if(err){
          return res.status(200).json({ error: err });
        }
        const result = {
          ...result1[0],
          ...result2[0],
        }
        res.status(200).json(result)

      })
    }else{
      const result = {
        ...result1[0]
      }
      res.status(200).json(result)
    }
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
  }
}

const UpdateStoreInfo = (req , res) => {
  const {store_name , phone_number} = req.body ; 
  const storeLogoFile = req.file;
  const fields = []
  const values = []
  
  if(store_name){
    fields.push("store_name = ?")
    values.push(store_name)
  }
  if(phone_number){
    fields.push("phone_number = ?")
    values.push(phone_number)
  }
  if(storeLogoFile){
    fields.push("store_logo = ?")
    values.push(storeLogoFile.filename);
  }

  const query = `UPDATE seller SET ${fields.join(', ')} WHERE phone_number = ?`
  values.push(phone_number);
  db.query(query , values , (err) => {
    if (err) {
      return res.json({ error: err });
    }
    res.status(200).json({ message: "Store updated successfully" });
  })
}


module.exports = {Signup , Login , GetUserInfo , UpdateUserInfo , UpdateStoreInfo};
