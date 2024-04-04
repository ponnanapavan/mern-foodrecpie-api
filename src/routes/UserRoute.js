import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/UserModel.js';

const router=express.Router();

router.post('/register', async(req,res)=>{
       const {username,password}=req.body;
      const usercheck=await UserModel.findOne({username});
      if(usercheck){
        return res.json({message:"User already exits!"})
      }
        const hashpassword=await bcrypt.hash(password,10);

        const newUser=new UserModel({
            username,
            password:hashpassword
        })
           await  newUser.save();
           res.json({message:"user registrations suceefully"});    
});


router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const usercheck=await UserModel.findOne({username});
    if(!usercheck){
        return res.json({message:"user doesn't exist"})
    }
    const passwordcheck=await bcrypt.compare(password,usercheck.password);
    if(!passwordcheck){
        return res.json({message:"password is incorrect"})
    }

    const token=jwt.sign({id:usercheck._id},"secret");// it will create one token based up on id
    res.json({token,userID:usercheck._id});
})



export {router as UserRouter};


export const tokenVerify=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"secret",(err)=>{
            if(err)
            return res.sendStatus(403);
            next();
        })
    }else{
        res.sendStatus(401)
    }
}