const mongoose=require("mongoose");
const asyncHandler = require('express-async-handler');
async function connectDB(){
    try{

        await mongoose.connect("mongodb://localhost:27017/practice")
        console.log("db is connected")
    }
    catch(error)
    {
        console.log(error);
    }
}
module.exports = connectDB;
