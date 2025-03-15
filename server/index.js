
const http = require("http");
const PORT  = 8000;

const authRoute = require("./routes/user.route")


const server = http.createServer((req , res) => {
     
    
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific methods
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    ); // Allow specific headers

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.writeHead(204); // No content for OPTIONS request
      res.end();
      return;
    }



     if (req.url === "/" && req.method === "GET") {
       res.writeHead(200, { "Content-Type": "text/plain" });
       res.end("Hello from the server!");
     } else {
       // Pass other routes to the authRoute
       authRoute(req, res);
     }
})





server.listen(PORT , () => {
    console.log("the server is running");
})