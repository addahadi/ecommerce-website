
const db = require("../db");

function getNotification(req ,res){
    const sellerId = req.query.seller_id;

    if (!sellerId) {
      return res.status(400).json({ message: "Missing seller_id" });
    }

    const query = `
        SELECT id, title, body, product_id, is_read, created_at
        FROM notification
        WHERE seller_id = ?
        ORDER BY created_at DESC
      `;

    db.query(query, [sellerId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }

      res.status(200).json(results);
    });
}

function markAsRead(req , res){
    const notificationId = req.params.id;

    const query = "UPDATE notification SET is_read = 1 WHERE id = ?";
    db.query(query, [notificationId], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }
      res.status(200).json({ message: "Notification marked as read" });
    });
}



module.exports = {getNotification , markAsRead}