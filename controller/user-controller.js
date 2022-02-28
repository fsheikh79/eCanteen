const UserModel = require("../model/user-model")


//add [ POST ]
module.exports.addUser = function (req, res) {

    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let encPassword = bcrypt.hashSync(password,10)

    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: encPassword,
        role: role
    })
    
    user.save(function (err, data) {
        if (err) {
            res.json({ msg: "SMW", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "signup done", data: data, status: 200 })//http status code 
        }
    })


}

//list
module.exports.getAllUsers = function (req, res) {

    UserModel.find().populate("role").exec(function (err, data) {
        if (err) {
            res.json({ msg: "SMW", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "users ret...", data: data, status: 200 })//http status code 
        }
    })
}


//delete
module.exports.deleteUser = function(req,res){
    //params userid 
    let userId = req.params.userId //postman -> userid 

    UserModel.deleteOne({_id:userId},function (err, data) {
        if (err) {
            res.json({ msg: "SMW", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "user removed...", data: data, status: 200 })//http status code 
        }
    })
}


//update 

module.exports.updateUser = function(req,res){
        //update role set roleName = admin where roleId = 12121 
        let userId = req.body.userId 
        let firstName = req.body.firstName 
        let email  = req.body.email
        let password = req.body.password
    
        UserModel.updateOne({_id:userId},{firstName:firstName,email:email,password:password},function(err,data){
            if(err){
                res.json({msg:"Something went wrong!!!",status:-1,data:err})
            }else{
                res.json({msg:"updated...",status:200,data:data})
            }
        })
}

//login 
module.exports.login = function(req,res){

    let param_email = req.body.email
    let param_password = req.body.password
    let isCorrect = false;

    UserModel.findOne({email:param_email},function(err,success){
        if(success){
            let ans = bcrypt.compareSync(param_password,success.password)
            if(ans == true){
                isCorrect = true
            }
        }
        if(isCorrect == false){
            res.json({ msg:"Invalid Credentials!!!",data: req.body, status: -1 })
        }else{
            res.json({ msg:"Login successful...", status: 200, data: success})
        }
    })

}