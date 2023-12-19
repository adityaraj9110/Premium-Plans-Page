import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authen = async(req,res,next)=>{
    
    const {token} = req.cookies;
    if(!token){
        next(new Error("You are not authenticate"));
    }else{
        const decode = jwt.verify(token,"svvfdhavyywebwghe")
        console.log("decode: ",decode)
        let id = await decode._id
        req.user = id;
        next();
    }
}
export default authen;