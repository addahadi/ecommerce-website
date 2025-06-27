const { getNotification, markAsRead } = require("../controller/notification.controller");
const express = require("express")
const router = express.Router()


router.get("/getNotifications", (req, res) => {
    getNotification(req , res)
});


router.post("/markasread/:id/read", (req, res) => {
  markAsRead(req , res)
});


module.exports = router;