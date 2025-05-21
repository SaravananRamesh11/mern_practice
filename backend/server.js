const { ObjectId } = require('mongodb');
const express = require("express");
const app = express();
const connectDB = require("./config/db"); // Make sure the path is correct
const {summa}=require("./model/SummaModel")
// const {router} = require("./routes/functionalities.js");

const Adminrouter= require("./routes/admin.js");
const Userrouter = require("./routes/user.js");
const Generalrouter = require("./routes/general.js");

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
app.use("/api/admin", Adminrouter);
app.use("/api/user", Userrouter);
app.use("/api/general", Generalrouter);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

// const { StatusCodes, ReasonPhrases } = require('http-status-codes');

// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode;
//   res.status(statusCode).json({
//     message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
//   });
// });






