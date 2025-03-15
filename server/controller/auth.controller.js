const bcrypt = require("bcrypt")
const db = require("../db")
const {createSellerUser , createClientUser} = require("../service/auth.service")


const register = (req , res) => {
    let body = "";
    let result;
    req.on("data" , chunk => {
        body += chunk.toString();
    })
    req.on("end" , async () => {
        result = JSON.parse(body);
        console.log(result)
        try {
            const { password , username , role , email} = result;
            const hashedPassword = await bcrypt.hash(password , 10);
            if(role == "seller"){
                const {store_name , store_logo , phone} = result;
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
            }
            else {
                createClientUser(res, username, email, hashedPassword, role);
            }       
        
        }
        catch (err){
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "invalid body", error: err.message }));
        }
    })

}

module.exports = { register };


