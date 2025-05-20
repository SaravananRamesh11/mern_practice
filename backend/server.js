const { ObjectId } = require('mongodb');
const express = require("express");
const app = express();
const connectDB = require("./config/db"); // Make sure the path is correct
const {summa}=require("./model/SummaModel")
// const {router} = require("./routes/functionalities.js");

// const Adminrouter= require("./routes/admin.js");
// const Userrouter = require("./routes/user.js");
// const Generalrouter = require("./routes/general.js");

const {router} =require("./routes/functionalities")

const cors = require('cors');


// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true // If using cookies/sessions
}));

// ... rest of your server code

// Start the server
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// Connect to database
connectDB();
//middlewares
app.use(express.json())
app.use("/api/vista",router)


// app.use("/api/vista", Adminrouter);
// app.use("/api/vista", Userrouter);
// app.use("/api/vista", Generalrouter);






// app.post("/api/summa/",async(req,res)=>{
//   try{
//     const result=await summa.insertOne(req.body);
//     console.log(result)
//     res.status(200).json(result)

//   }
//   catch(error)
//   {
//     console.log(error)
//   }


// })

// app.get("/api/summa",async(req,res)=>{
//   try{
//     const result=await summa.find()
//     res.status(200).json(result)
    
//   }
//   catch(error)
//   {
//       console.log(error)
//   }
  
// })

// app.delete("/api/summa/:id",async(req,res)=>{

//   const id=req.params
//   try{
//     const repeat=await summa.deleteOne({_id: new ObjectId(id)})
//     console.log(repeat)
//     res.status(200).json({"meassage":"deleted successfully"})

//   }
//   catch(error)
//   {
//     console.log(error)
//   }

// })