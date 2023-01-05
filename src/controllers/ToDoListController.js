const { now } = require("mongoose");
const ToDoListModel = require("../models/ToDoListModel");
//var jwt = require('jsonwebtoken');

const currentDate = new Date();

exports.CreateToDo=(req,res)=>{
    let reqBody= req.body;
    let UserName=req.headers['username'];
    let ToDoSubject=reqBody['ToDoSubject'];
    let ToDoDescription=reqBody['ToDoDescription'];
    let ToDoStatus="New";
    const currentDate = new Date();// for toady date
    let ToDoCreateDate=currentDate.toDateString();
    let ToDoUpdateDate=currentDate.toDateString();
    let PostBody={
        UserName:UserName,
        ToDoSubject:ToDoSubject,
        ToDoDescription:ToDoDescription,
        ToDoStatus:ToDoStatus,
        ToDoCreateDate:ToDoCreateDate,
        ToDoUpdateDate:ToDoUpdateDate
    }
    
    ToDoListModel.create(PostBody,(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

//User Read ToDo..
exports.ToDoSelect=(req,res)=>{
    let UserName=req.headers['username'];
    ToDoListModel.find({UserName:UserName},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}

//Update todolist...............Problem
exports.UpdateToDo=(req,res)=>{
    //console.log(`Request Body : ${JSON.stringify(req.body)}`);
    // let ToDoSubject=req.body['ToDoSubject']
    // let ToDoDescription=  req.body['ToDoDescription']
    // let _id=  req.body['_id']
    // console.log(` Type of _ID : ${_id}`);
    let {ToDoSubject, ToDoDescription,_id} = req.body;

    let ToDoUpdateDate=new Date();
    let PostBody={
        ToDoSubject:ToDoSubject,
        ToDoDescription:ToDoDescription,
        ToDoUpdateDate:ToDoUpdateDate.toDateString(),
    }

    ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail to Update",data:error})
        }
        else {
            res.status(200).json({status:"Successfully Updated",data:data})
        }
    })

}

//Remove todolist
exports.RemoveToDo=(req,res)=>{
    let _id=  req.body['_id']

    ToDoListModel.remove({_id:_id},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail to Remove",data:error})
        }
        else {
            res.status(200).json({status:"Successfully Remove",data:data})
        }
    })

}

//select todo by status
exports.SelectToDoByStatus=(req,res)=>{''
    let UserName=req.headers['username'];
    let ToDoStatus=req.body['ToDoStatus'];
    ToDoListModel.find({UserName:UserName,ToDoStatus:ToDoStatus},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}

//select todo by date...............Problem
exports.SelectToDoByDate=(req,res)=>{    
    let UserName=req.headers['username'];
    let FromDate=req.body['FromDate'];
    let ToDay=req.body['ToDay'];

    console.log(`${UserName} = ${FromDate} = ${ToDay}`);
    ToDoListModel.find({UserName:UserName,ToDoCreateDate:{$gte:FromDate,$lte:ToDay}},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail to filter",data:error})
        }
        else{
            res.status(200).json({status:"Filter by Date",data:data})
        }
    })
}