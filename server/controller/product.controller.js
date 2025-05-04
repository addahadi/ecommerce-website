const db = require("../db")




const addNewProduct  = (req , res) => {
    const {title , desc , category , price , stock, region , facebook} = req.body
    const userId = req.session.user.Id;
    const fileArray = req.files
    const query =
      "INSERT INTO product (title, descr, category, price , stock , region , rating , facebook , userId) VALUES (?, ?, ?, ?, ?, ? ,? , ? , ?)";
    
    db.query(query , [title , desc , category , price , stock , region , 0 , facebook , userId] , (err , result) => {
        if(err){
            return res.status(500).json({error : err})
        }
        const productId = result.insertId;
        const query = "INSERT INTO product_img (img_url,productId) VALUES ?";
        const imgData = fileArray.map((file) => [file.filename , productId])
        db.query(query , [imgData] , (err , result) => {
            if (err) {
               return res.status(500).send("Error saving images.");
            }
  
            res.status(200).json("✅ Product and images added successfully!");
        })       
    })
}



function getProducts(req,res){

    let query = 'SELECT productId , title , rating , price FROM product'

    db.query(query , function(err , products){
        if(err){
            return res.json({message:'there is an error'})

        }
        

        let query2 = 'SELECT img_url , imgId FROM product_img WHERE productId = ?'
        let result  = {
            success : true,
            data : [] 
        }
        const promise = products.map((product) => {
            const producId = product.productId
            return new Promise((reslove , reject) => {
                db.query(query2, [producId], function (err, image) {
                  if (err) {
                    return reject(err)
                  }
                  reslove({ ...product, ...image[0] })
                });
            })
        })
        Promise.all(promise).then((result) => {
            
            res.json({
               success: true,
               data: result,
             });
        }).catch((err) => {
            res.json({message : "no result"})
        })

    })
}



function rateProduct(req , res) {
      
    const { productId, rating , userId } = req.body;
    
    const query = `INSERT INTO product_rating (userId, productId, rating)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE rating = ?, updated_at = CURRENT_TIMESTAMP;`;

    db.query(query, [userId, productId, rating, rating], (err) => {
    if (err) {
        return res.json({ message: "failed to rate" });
    }
    res.json({ message: "successful rate" });
    });

    
}

function getRating(req, res) {
    const {productId} = req.body
    const query = `SELECT AVG(rating) AS average , COUNT(*) AS total FROM product_rating WHERE productId = ?`
    db.query(query , [productId] , (err , result) => {
        if(err){
            return res.json({message : err})
        }
        res.json({
            average: parseFloat(result[0].average).toFixed(1),
            total: result[0].total,
        })        
    })
}


function getProduct(req , res) {
    const { productId } = req.body;
    
    const query = `SELECT product.*, phone_number
                   FROM product, seller
                   WHERE product.userId = seller.user_Id
                   AND product.productId = ?`
    db.query(query , [productId] , (err , productResult) => {
        if(err){
           return res.json({message : err})
        }
        const query2 = 'SELECT  img_url FROM product_img WHERE productId = ?'
        db.query(query2 , [productId] , (err , images) =>{
            if(err){
                return res.json({message : err})
            }

            const imgList = []
            for(img of images){
                imgList.push(img["img_url"])
            }
            const Data = {
                ...productResult[0],
                imges : imgList
            }
            res.json({state : true , data:Data});
                 })

    })
}



module.exports = { addNewProduct, getProducts, getProduct, rateProduct , getRating};

