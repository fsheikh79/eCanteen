const express = require('express');
const app = express()
const sessionController =require("./controller/session-controller")
const mongoose = require("mongoose")
const roleController = require("./controller/role-controller")
const userController = require("./controller/user-controller")
//const app = express()
//middle ware 
app.use(express.json()) //mobile -> accept json data from request and set data into body || it allw us to recieve the data from frontend
app.use(express.urlencoded({extended:true})) //web --> accept url encoded data from request and set data into body  
app.get("/",function(req,res){
    res.write("Welcome")
    res.end()
})
app.post('/usersave',sessionController.usersave)


app.get("/login",sessionController.login)
app.get("/signup",sessionController.signup)
// app.get("/login",function(req,res){
//     res.write("login")
//     res.end()
// })

//role
app.post("/roles",roleController.addRole)
app.get("/roles",roleController.getallRoles)
app.delete("/roles/:roleid",roleController.deleteRole)
app.put("/roles",roleController.updateRole)

//users
app.post("/users",userController.addUser)
app.get("/users",userController.getAllUsers)
app.delete("/users/:userId",userController.deleteUser)
app.put("/users",userController.updateUser)

//app.post("/login",userController.login)

//datbase 
mongoose.connect('mongodb://localhost:27017/eCanteen',function(err)
{
    if(err){
        console.log("Database connection failed");
        console.log(err)
    }
    else{
        console.log("db connection success")
    }
})
app.listen(3000,function(){

    console.log("Server is at 3000")
})