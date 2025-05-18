const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    name:{type:String,
        required:true},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true  
    },
    role:{
        type: String,
        enum: ["user", "admin"], 
        required: true
    }


},
{
    timestamps:true
});

const summa=mongoose.model("bundas",Schema)
module.exports=summa
