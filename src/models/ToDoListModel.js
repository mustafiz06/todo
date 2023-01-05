
const mongoose=require("mongoose");

const DataSchema=mongoose.Schema({
    UserName:{type:String},
    ToDoSubject:{type:String},
    ToDoDescription:{type:String},
    ToDoStatus:{type:String},
    ToDoCreateDate:{type:String},
    ToDoUpdateDate:{type:String}
    
},{versionKey:false}
);

const ToDoListModel=mongoose.model('todolists',DataSchema);
module.exports=ToDoListModel;