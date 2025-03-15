const { register } = require("../controller/auth.controller")



const authRoute = (req , res) => {
    if(req.method == 'POST' && req.url == "/auth"){
        register(req , res)
    }
}


module.exports = authRoute