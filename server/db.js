const mysql = require("mysql2");





const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "alialiali123",
    database : "ecommerce-schema"
})


db.connect((err) => {
    if(err){
        console.error(err);
        return;
    }
    console.log("connected to mysql successfully")
})

module.exports = db


