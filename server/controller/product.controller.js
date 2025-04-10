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
            res.status(200).json("✅ Product and images added successfully!");
        })       
    })
}



function getProduct(req,res){

    let query = 'SELECT productId , title , rating , price FROM product'

    db.query(query , function(err , res1){
        if(err){
            return res.json({message:'there is an error'})

        }
        const producId = res1[0].productId

        let query2 = 'SELECT img_url , imgId FROM product_img WHERE productId = ?'

        db.query(query2 , [producId] , function(err , res2) {
            if(err){
                return res.json({message:'there is an error'})
            }
            const result = {
                ...res2[0],
                ...res1[0]
            }
            res.json(result);

        })

    })





}

module.exports = {addNewProduct , getProduct}

