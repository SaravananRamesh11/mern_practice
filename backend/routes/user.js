const express=require("express")
const router=express.Router()
const {getuser}=require("../controller/function.js")


router.get("/user/:id",getuser)
module.exports=router