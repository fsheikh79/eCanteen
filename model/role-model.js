const mongoose = require("mongoose")

//creating schema 

let RoleSchema = new mongoose.Schema({
         roleName:{
            type:String
        }

})
//model 

let Rolemodel= mongoose.model("role",RoleSchema)
module.exports = Rolemodel