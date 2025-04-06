const db = require("../db")




const addNewProduct  = (req , res) => {
    const {title , desc , category , price , stock, region} = req.body
    const fileArray = req.files
    const query =
      "INSERT INTO product (title, descr, category, price , stock , region , rating) VALUES (?, ?, ?, ?, ?, ? , ?)";
    
    db.query(query , [title , desc , category , price , stock , region , 0] , (err , result) => {
        if(err){
            return res.status(500).json({error : err})
        }
        const productId = result.insertId;
        const query = "INSERT INTO product_img (img_url,productId) VALUES ?";
        const imgData = fileArray.map((file) => [file.filename , productId])
        db.query(query , [imgData] , (err , result) => {
            if (err) {
               console.error("❌ Error inserting images:", err);
               return res.status(500).send("Error saving images.");
            }
            res.send("✅ Product and images added successfully!");
        })       
    })
}


module.exports = {addNewProduct}

