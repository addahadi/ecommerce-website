const db = require("../db")


function getSellerById(req , res) {
    const sellerId = parseInt(req.params.sellerId);
    const query = `SELECT  u.userId , u.username , s.store_name , s.store_logo , s.phone_number , s.user_id
    FROM user u , seller s 
    WHERE u.userId = s.user_id AND u.userId = ?`;
    const params = [sellerId]
    db.query(query, params, (err, result) => {
        if (err) {
            console.error("Error fetching seller information:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Seller not found" });
        }
        const sellerInfo = {
            status : true ,
            data : result[0]
        }
        return res.status(200).json(sellerInfo);
    })
}


function getSellerProducts(req , res) {
    const sellerId = parseInt(req.params.sellerId);
    const query = `SELECT p.productId , p.title , p.descr , p.price , p.created_at ,
    (SELECT img_url FROM product_img WHERE p.productId = product_img.productId LIMIT 1) AS  img_url
    FROM product p
    WHERE p.userId = ?
    ORDER BY p.created_at DESC`;
    const params = [sellerId];
    db.query(query, params, (err, result) => {
        if (err) {
            console.error("Error fetching seller products:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "No products found for this seller" });
        }
        const products = {
            status: true,
            data : result
        }
        return res.status(200).json(products);
    });
}




module.exports = {
    getSellerById
    , getSellerProducts
};