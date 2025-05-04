

const db = require("../db")

function addWishlist(req ,res){
    const { productId } = req.body;
    const userId = req.session.user.Id;    
    console.log(userId , productId)
    const query =
      "INSERT IGNORE INTO wishlists (user_id, product_id) VALUES (?, ?)";
    db.query(query , [userId , productId] , (err) => {
        if(err){
            return res.json({message : err})
        }
        res.status(200).json({status : true})
    })
}



function delWishlist(req , res){
    const { productId } = req.body;
    const userId = req.session.user.Id;

    const query = "DELETE FROM wishlists WHERE product_id = ? AND user_id = ?";
    db.query(query, [productId, userId], (err) => {
      if (err) {
        return res.status(500).json({ error: "Error happened during delete" });
      }
      return res.status(200).json({ status: false }); 
    });

}

function getWishlist(req , res){
    const userId = req.session.user.Id;
    const query = "SELECT product_id FROM wishlists WHERE user_id = ?"
    
    db.query(query , [userId] , (err , respence) => {
        if(err){
            return res.json({message : err})
        }
        const result = respence.map((r) => {
            return r.product_id
        })
        res.json({data : result})
    })
}


function getWishlists(req, res){
    const userId = req.session.user.Id;
    const query = "SELECT p.* , w.id AS WishlistId FROM wishlists AS w JOIN product AS p ON p.productId = w.product_id WHERE w.user_id = ?"

    db.query(query , [userId] , (err , result) => {
        if(err){
            return res.json({error : err})
        }
        res.json({data : [...result]})
    })
}

module.exports = {addWishlist , getWishlist , delWishlist , getWishlists}