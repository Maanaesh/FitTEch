import fitUser from "../Models/userModel.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:"2d"});
}

export const signUp = async (req,res)=>{
    const data = req.body;
    //console.log(data);
    try{
        const user = await fitUser.signUpUser(data);
        res.status(200).json({success:true,message:"User Created"});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({success:false,message:error.message});
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body
    //console.log(email,password);
    try {
        const user = await fitUser.login(email,password);
        //create token
        const token = createToken(user._id);
        // console.log(user.role);
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

export const getUsers = async(req,res)=>{
    try{
    const users= await fitUser.find({});
    res.status(200).json({ success: true, data: users });
    }
    catch (error) {
    console.log("Error in fetching Users", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}