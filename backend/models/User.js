import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    plans:{
        type:Array,
        default:[]
    }
})

const User = mongoose.model("User",userSchema);
export default User;