const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const PORT = 8090;
const multer = require("multer");


app.use(express.json()); 

app.use(express.static(path.join(__dirname, "../frontEnd")));
app.use(
  "/server/uploads",
  express.static(path.join(__dirname, "../server/uploads"))
);
app.use("/uploads", express.static("uploads"));


const sessionStore = new MySQLStore({
  host: "127.0.0.1",
  user: "root",
  password: "missoumadda",
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

const pageRoutes = require("./pageRoute");

app.use("/" , pageRoutes);



app.use("/auth", authRoutes);

app.use("/products" , productRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
