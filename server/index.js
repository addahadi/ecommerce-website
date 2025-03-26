const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/user.route");

const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const PORT = 8090;


app.use(express.json()); 


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

// CORS configuration must be:
app.use(cors({
  origin: "http://localhost:5500", // Must match EXACTLY
  credentials: true,
 
}));



app.get("/", (req, res) => {
  res.status(200).send("Hello from the server!");
});




app.use("/auth", authRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

