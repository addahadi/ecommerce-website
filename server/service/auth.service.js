const bcrypt = require("bcrypt");
const db = require("../db");




const createClientUser = async (res, username, email, hashedPassword, role) => {
  const query =
      "INSERT INTO user (username, email, pssword, role) VALUES (?, ?, ?, ?)";

    db.query(query, [username, email, hashedPassword, role], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error inserting user", error: err.message });
      }
      res.status(201).json({
        message: "User created successfully",
        userId: result.insertId,
      });
  });
};




const createSellerUser = async (res,username,email,hashedPassword,role,store_name,store_logo,phone) => {
  const query =
    "INSERT INTO user (username, email, pssword, role) VALUES (?, ?, ?, ?)";

  db.query(query, [username, email, hashedPassword, role], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error inserting user", error: err.message });
    }

    const userId = result.insertId;
    const query2 =
      "INSERT INTO seller (user_id, store_name, store_logo, phone_number) VALUES (?, ?, ?, ?)";

    db.query(query2, [userId, store_name, store_logo, phone], (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error inserting seller details",
          error: err.message,
        });
      }
      res
        .status(201)
        .json({ message: "Seller created successfully", userId });
    });
  });
}




const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user.pssword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    req.session.user = { id: user.userId, email: user.email , role:user.role , username : user.username };

    res.status(200).json({ message: "Login successful" });
  
  });
};

module.exports = { createSellerUser, createClientUser, loginUser };
