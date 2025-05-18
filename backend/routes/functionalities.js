const express=require("express")
const router=express.Router()
const {getAll,insert,login,getuser}=require("../controller/function.js")

router.get("/getall",getAll);
router.post("/insert",insert)
router.post("/login",login)
router.get("/user/:id",getuser)


module.exports={router}