const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token,process.env.secretKey,(err,decoded) => {
            if(decoded){
                console.log(decoded)
                req.body.userID = decoded.userID
                req.body.name = decoded.name
                req.body.role = decoded.role
                next()
            } else {
                res.send({"msg":"You are not authorised"})
            }
        })
    } else {
        res.send({"msg":"You are not authorised"})
    }
}

// if only one role have permission
const restrict = (role)=>{
    return (req,res,next) =>{
        if(req.body.role !== role){
            res.status(403).send({"msg":"You do not have permission to perform this operation"})
        }else {

            next()
        }
    }
}


// if only many role have permission
// const restrict = (...role)=>{
//     return (req,res,next) =>{
//         if(!role.includes((req.body.role))){
//             res.status(403).send({"msg":"You do not have permission to perform this operation"})
//         } else {
//              next()
//         }
//     }
// }

module.exports = {
    auth,
    restrict
}