const mongoose = require('mongoose');
const {Mongoose} = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        emailID:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

const user = Mongoose.model("user",userSchema)

module.exports = user   