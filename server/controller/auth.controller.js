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

const GetUserInfo = async (req, res) => {
  const userId = req.session.user.Id;
  console.log(userId)
  const userQuery =
    "SELECT username, email, pssword, role FROM user WHERE userId = ?";

  db.query(userQuery, [userId], (err, userResult) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (!(userResult.length > 0 )) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult[0];
    console.log(user)
    if (user.role == "seller") {
      const sellerQuery = `
        SELECT 
          s.store_name, 
          s.store_logo, 
          s.phone_number,
          COUNT(p.productId) as total_products,
          COALESCE(AVG(r.rating), 0) as avg_rating,
          COUNT(DISTINCT r.userId) as total_customers_rated

        FROM seller s
        LEFT JOIN product p ON s.user_id = p.userId
        LEFT JOIN product_rating r ON p.productId = r.productId
        WHERE s.user_id = ?
        GROUP BY s.sellerId
      `;

      db.query(sellerQuery, [userId], (err, sellerResult) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        const result = {
          ...user,
          ...(sellerResult[0] || {}),
          total_products: sellerResult[0]?.total_products || 0,
          avg_rating: parseFloat(sellerResult[0]?.avg_rating || 0).toFixed(1),
          total_views: sellerResult[0]?.total_views || 0,
        };
        console.log(result)
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(user);
    }
  });
};

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
