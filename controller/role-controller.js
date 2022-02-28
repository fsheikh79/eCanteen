//const { status } = require("express/lib/response");

 //const res = require("express/lib/response");
const Rolemodel = require("../model/role-model");

//  function addRole(req,res){   //module can be used when function can be exports 

//     console.log(req.body.roleName);
//     res.json({msg:"role added",status:200,data:req.body})
 
// }

module.exports.addRole=function (req,res)
{
    //db insert role 
 console.log(req.body.roleName)
 let role = new Rolemodel({
     roleName:req.body.roleName
 })
 role.save(function(err,success){

    if(err){
        console.log(err);
        res.json({msg:"Something went wrong",status:-1,data:req.body})
    }
    else{
        res.json({msg:"role added",status:200,data:success})
    }
 })
}


module.exports.getallRoles = function(req,res){
    Rolemodel.find(function(err,roles){
     if(err){
         res.json({msg:"Something went wrong",status:-1,data:err})
     }else{
        res.json({msg:"role added",status:200,data:roles})
     } 

    })
}

module.exports.deleteRole = function(req,res){
let roleid = req.params.roleid
//delet it when the id is 1
Rolemodel.deleteOne({"_id":roleid},function(err,success){

    if(err){
        console.log(err);
        res.json({msg:"Something went wrong",status:-1,data:err})
    }
    else{
        res.json({msg:"deleted..",status:200,data:success})
    }
 })
}

module.exports.updateRole=function(req,res){
    let roleid = req.body.roleid
    let roleName = req.body.roleName
    Rolemodel.updateOne({"_id":roleid},{roleName:roleName},function(err,success){

        if(err){
            console.log(err);
            res.json({msg:"Something went wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"updated..",status:200,data:success})
        }
 })
}