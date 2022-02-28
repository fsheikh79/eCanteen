const fs = require("fs")
function login(req,res){
    res.write("login")
    res.end()
}
function signup(req,res){
    let signupHtml=fs.readFileSync("./views/Signup.html")
    res.write(signupHtml)
    res.end()
}

module.exports.usersave=function (req,res)
{
 res.write("Data saved")
 console.log(req.body)
 res.end()   
}
module.exports.login= login
module.exports.signup= signup
