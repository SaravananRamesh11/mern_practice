const mongoose=require("mongoose");
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
// const mongoose = require("mongoose");

// async function connectDB() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/practice");
//     console.log("db is connected");
    
//     // Remove the app.listen from here - it should be in server.js
//   } catch(error) {
//     console.log(error);
//   }
// }

// // Export the function itself, not its result
// module.exports = connectDB;