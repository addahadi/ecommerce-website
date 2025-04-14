const mysql = require("mysql2");





const db = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "missoumadda",
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


