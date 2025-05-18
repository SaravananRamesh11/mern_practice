const express=require("express")
const router=express.Router()
const {getAll,insert,login}=require("../controller/function.js")

router.get("/getall",getAll);
router.post("/insert",insert)
router.post("/login",login)


module.exports={router}