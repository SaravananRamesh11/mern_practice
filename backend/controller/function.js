const mongoose=require("mongoose")
const express= require("express")
const summa=require("../model/SummaModel.js")
const jwt=require("jsonwebtoken")

const getAll= async(req,res)=>{
    try{
        const summas=await summa.find();
        console.log(summas);
        res.status(200).json({summas})

        
    }
    catch(error)
    {
        res.status(500).json({message:"error while getting all trhe details"})
    }

}

const insert=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
         const newUser = new summa({ name, email, password ,role});
        const savedUser = await newUser.save()
        console.log(newUser)

        res.status(201).json({message:"data inserted successfully"})
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({error})
    }

}

const login=async (req,res)=>{
    try{
        const mail=req.body.email;
        
        console.log(mail)
        
        
        const found=await summa.findOne({email:mail})
        console.log(found)
        if(!found)
        {
            return res.status(404).json({message:"the mail is wrong!!"})

        }
        if (found.password===req.body.password)
        {
            const token=jwt.sign({role:found.role,name:found.name,email:found.email},"erxfcgvhgjxfcgvhb",{expiresIn: '1h'})
            const role=found.role
            res.status(200).json({token,mail,role})

        }
        else{
            res.status(401).json({message:"the password is wrong!!"})
        }

    }
    catch(error)
    {
        console.log(error)
        
    }

}

module.exports={getAll,insert,login}

