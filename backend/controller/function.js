const mongoose=require("mongoose")
const express= require("express")
const summa=require("../model/SummaModel.js")
const jwt=require("jsonwebtoken")
const { ObjectId } = require('mongodb');
const asyncHandler = require('express-async-handler');

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

const login=asyncHandler(async (req,res)=>{
    
        const mail=req.body.email;
        
        console.log(mail)
        const found=await summa.findOne({email:mail})
        console.log(found)
        if(!found)
        {
            res.status(404);
            throw new Error("The mail is wrong!!");
        }
        if (found.password===req.body.password)
        {
            console.log(found)
            const token=jwt.sign({role:found.role,name:found.name,email:found.email},"erxfcgvhgjxfcgvhb",{expiresIn: '1h'})
            const id=found._id
            const role=found.role
            res.status(200).json({token,id,role})

        }
        else{
            res.status(401)
            throw new Error("The password  is wrong!!");
        }
})

const getuser = async (req, res) => {
    try {
        // 1. Validate the ID format first
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ 
                message: "Invalid ID format - must be 24-character hex string" 
            });
        }

        // 2. Convert to ObjectId
        const userId = new ObjectId(req.params.id);

        // 3. Query the database
        const detail = await summa.findOne({ _id: userId });
        
        if (!detail) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(detail);
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ 
            message: "Server error",
            error: error.message // Send error details in development
        });
    }
}

module.exports={getAll,insert,login,getuser}

