var jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{

   let Token=req.headers['token-key'];

   jwt.verify(Token,"SecretKey12345",function (error,decoded) {
        if(error){
            res.status(401).json({status:"Unauthorized"})
        }
        else {
            let username=decoded['data']['UserName'];
            req.headers.username=username
            next();
        }
    })
}