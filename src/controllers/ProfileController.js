const ProfileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');
// create New Profile
exports.CreateProfile=(req,res)=>{
    let reqBody= req.body;
    ProfileModel.create(reqBody,(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

// User Login 
exports.UserLogin=(req,res)=>{
    let UserName=req.body["UserName"];
    let Password=req.body["Password"];

    ProfileModel.find({UserName:UserName,Password:Password},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else{
            if(data.length>0){
//Auth verification...JWT
                let payload={exp: Math.floor(Date.now()/1000) + (24 * 60 * 60),data:data[0]};
                var token = jwt.sign(payload,'SecretKey12345');
                res.status(200).json({status:"successfully Login",token:token ,data:data[0]})
            }
            else{
                res.status(401).json({status:"Unauthorized Or the Password/Username is wrong"})
            }
        }
    })
}


//User Read Profile..
exports.SelectProfile=(req,res)=>{''
    let UserName=req.headers['username'];
    ProfileModel.find({UserName:UserName},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}


//Update profile.....................
exports.UpdateProfile=(req,res)=>{
    let UserName=req.headers['username'];
    let reqBody=req.body;
    ProfileModel.updateOne({UserName:UserName},{$set:reqBody},{upsert:true},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail to Update",data:error})
        }
        else{
            res.status(200).json({status:"Successfully Updated",data:data})
        }
    })

}



