const db = require("../db");

const createClientUser = (res, username , email, hashedPassword, role) => {
  const query =
    "INSERT INTO user (username , email , pssword , role) VALUES (?,?,?,?)";
  db.query(query, [username, email, hashedPassword, role], (err, result) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "inserting err", error: err.message }));
      return;
    }
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "user created successfully",
        userId: result.insertId,
      })
    );
  });
};



const createSellerUser = (res, username, email, hashedPassword, role , store_name , store_logo , phone) => {
  const query =
    "INSERT INTO user (username , email , pssword , role) VALUES (?,?,?,?)";



  db.query(query, [username, email, hashedPassword, role], (err, result) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "inserting err", error: err.message }));
      return;
    }

    const query2 = 'INSERT INTO seller (user_id , store_name , store_logo , phone_number) VALUES (?,?,?,?)'
    db.query(query2 , [result.insertId , store_name , store_logo , phone] , (err , result) => {
        if(err){
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "inserting err", error: err.message })
            );
            return
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "inserting went seccssfully" })
        );

    })
    
  });
};


module.exports = {createSellerUser , createClientUser}