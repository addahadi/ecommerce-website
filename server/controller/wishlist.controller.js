

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
    })
}



function delWishlist(req , res){
    const id = req.params.id;
    const userId = req.session.user.Id
    
    const query = 'DELETE FROM wishlists WHERE id = ? AND user_id = ?'

    db.query(query , [id , userId] , (err) => {
        if(err){
            res.json({error : err})
        }
        res.status(204).json({message : "the message is deleted successfuly"})
    })


}


function getWishlist(res , req){
    const userId = req.session.user.Id;
    const query = "SELECT p.* , w.id AS WishlistId FROM wishlists AS w JOIN product AS p ON p.id = w.product_id WHERE w.user_id = ?"

    db.query(query , [userId] , (err , result) => {
        if(err){
            return res.json({error : err})
        }
        console.log(result[0])
    })
}

module.exports = {addWishlist , getWishlist , delWishlist}