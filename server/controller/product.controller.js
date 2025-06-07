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

    let query = `(SELECT  p.productId , p.category , p.title , p.created_at , p.price , CAST(AVG(r.rating) AS UNSIGNED) AS rate ,COUNT(r.id) AS total
    ,(
      SELECT img_url 
      FROM product_img i 
      WHERE p.productId = i.productId 
      LIMIT 1
    ) AS img_url
    FROM product p, product_rating r
    WHERE p.productId = r.productId
    GROUP BY p.productId, p.category, p.title, p.created_at, p.price)
    
    UNION 
    (
      SELECT p.productId , p.category , p.title , p.created_at , p.price , 0 as rate  , 0 as total 
    ,(
      SELECT img_url 
      FROM product_img i 
      WHERE p.productId = i.productId 
      LIMIT 1
      ) AS img_url
      FROM product p
      WHERE p.productId NOT IN (SELECT productId FROM product_rating)
    );`;

    db.query(query , function(err , result){
        if(err){
            return res.json({message:'there is an error' , err})
        }
        const Res = {
          status : true ,
          data : result
        }
        res.json(Res)
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




function getLowerComputers(req , res){
  const query = `
  SELECT p.productId,p.price,p.title,CAST(AVG(r.rating) AS UNSIGNED) AS rate ,COUNT(r.id) AS total,
    (
        SELECT img_url
        FROM product_img pi
        WHERE pi.productId = p.productId
        LIMIT 1
    ) AS img_url
  FROM product p , product_rating r
  WHERE p.productId = r.productId AND p.category = "computer"
  GROUP BY 
      p.productId, p.price, p.title
  ORDER BY 
      price DESC
  LIMIT 5;
  `;


  db.query(query , (err , result) => {
    if(err){
      return res.json(err)
    }
    const Res = {
      status : true , 
      data : result
    }
    res.json(Res);
  })
}

function GetTopPhone(req , res){
  const query = `
  SELECT p.productId,p.price,p.title,CAST(AVG(r.rating) AS UNSIGNED) AS rate ,COUNT(r.id) AS total,
    (
        SELECT img_url
        FROM product_img pi
        WHERE pi.productId = p.productId
        LIMIT 1
    ) AS img_url
  FROM product p , product_rating r
  WHERE p.productId = r.productId AND p.category = "phone"
  GROUP BY 
      p.productId, p.price, p.title
  ORDER BY 
      rate DESC,
      total DESC
  LIMIT 5;
  `;
  db.query(query,(err , result) => {
    if(err){
      return res.json(err);
    }
    const Res = {
      status : true,
      data : result
    }
    res.json(Res);
  })
}


function filterProduct(req , res){
    const {category , price , sort , star , region} = req.query;
    const {minPrice , maxPrice} = handlePrice(price);
    let query = `SELECT p.title, p.category, p.created_at, p.price, p.productId, MIN(i.img_url) AS img_url,CAST(AVG(r.rating) AS UNSIGNED) AS rate
    FROM 
    product p, 
    product_img i, (SELECT productId, rating FROM product_rating ) r WHERE p.productId = i.productId AND p.productId = r.productId
`;    


    const values = [];

   
    if (category && category.length > 0) {
      query += " AND p.category = ?";
      values.push(category);
    }

    if (price && price.length > 0) {
      query += " AND p.price BETWEEN ? AND ?";
      values.push(minPrice, maxPrice);
    }

    if (region && region.length > 0) {
      const regionList = region.split(",");
      const placeholders = regionList.map(() => "?").join(",");
      query += ` AND p.region IN (${placeholders})`;
      values.push(...regionList);
    }

    query +=
      " GROUP BY p.productId, p.title, p.category, p.created_at, p.price";
    if(star && star.length > 0){
        const regionList = star.split(",").map((st) => { return parseInt(st)})
        const placeholders = regionList.map(() => "?").join(",")
        query += ` HAVING rate IN (${placeholders})`
        values.push(...regionList)
    }

    if (sort && sort.length > 0) {
      switch (sort) {
        case "Most liked":
          query += " ORDER BY rate DESC";
          break;
        case "Lowest Price":
          query += " ORDER BY p.price ASC";
          break;
        case "Highest Rating":
          query += " ORDER BY rate DESC";
          break;
      }
    }
    db.query(query , values , (err , result) => {
        if(err){
            console.log(err);
            return res.json({message : "you did somthing wrong"})
        }
        const Res = {
          status : true,
          data : result
        }
        res.status(200).json(Res)
    })

}


function handlePrice(price){
    let minPrice = 0;
    let maxPrice = Infinity;
    switch (price) {
      case "under20":
        minPrice = 0;
        maxPrice = 20;
        break;

      case "25to100":
        minPrice = 25;
        maxPrice = 100;
        break;

      case "100to300":
        minPrice = 100;
        maxPrice = 300;
        break;

      case "300to500":
        minPrice = 300;
        maxPrice = 500;
        break;

      case "over500":
        minPrice = 500;
        maxPrice = 10000;
        break;
    }
    return {maxPrice , minPrice}
}


function getRecommendedList(req , res) {
  const {productId} = req.params


  const query = `SELECT  p.productId,p.price,p.title , CAST(AVG(r.rating) AS UNSIGNED) AS rate ,COUNT(r.id) AS total,
  (SELECT img_url FROM product_img WHERE productId = p.productId LIMIT 1) AS img_url
  FROM product p , product_rating r
  WHERE p.productId = r.productId AND  p.productId != ?
    AND p.category = (SELECT category FROM product WHERE productId = ?)
  GROUP BY p.productId, p.price, p.title
  LIMIT 5;`;

  db.query(query , [productId , productId , productId , productId , productId] , (err , result) => {
    if(err){
      return res.json({message : err})
    }
    const Result= {
      status : true , 
      data : result
    }
    res.json(Result)
  })
}




module.exports = {
  addNewProduct,
  getProducts,
  getProduct,
  GetTopPhone,
  rateProduct,
  getRating,
  filterProduct,
  GetTopPhone,
  getLowerComputers,
  getRecommendedList
};

