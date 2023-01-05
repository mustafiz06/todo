const app=require("./app");
// const port=5000;

// app.listen(port,function(){
//     console.log("server is running port " + port)
// });


const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

app.listen(process.env.RUNNING_PORT,function(){
    console.log("server is running port " + process.env.RUNNING_PORT)
});