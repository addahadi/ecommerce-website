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
            
            console.log(result);
            res.json({
               success: true,
               data: result,
             });
        }).catch((err) => {
            res.json({message : "no result"})
        })

    })
}


function getProduct(req , res) {
    const { productId } = req.body;
    
    const query = 'SELECT * FROM product WHERE productId = ?'
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
            console.log(imgList)
            const Data = {
                ...productResult[0],
                imges : imgList
            }
            console.log(Data)
            res.json({state : true , data:Data});
                 })

    })
}



module.exports = {addNewProduct , getProducts , getProduct}

