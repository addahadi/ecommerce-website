const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const PORT = 8090;
const multer = require("multer");


app.use(express.json()); 


app.use("/uploads", express.static("uploads"));


const sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "alialiali123",
  database: "ecommerce-schema",
});



app.use(
  session({
    key: "session_cookie_name",
    secret: "your_super_secret_key",
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
  })
);


app.use(cors({
  origin: "http://localhost:5500",
  credentials: true,
 
}));



app.get("/", (req, res) => {
  res.status(200).send("Hello from the server!");
});



app.use("/auth", authRoutes);
app.use("/product" , productRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
