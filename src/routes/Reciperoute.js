import express from 'express'
import mongoose from 'mongoose'
import UserModel from '../models/UserModel.js';
import RecipeModel from '../models/Recipesmodel.js';
import { tokenVerify } from './UserRoute.js';
const router=express.Router();
export {router as recipeRouter}

router.get("/",async (req,res)=>{// this route is used to fetch all the recipe items  in the home page by using useEffect
     try{
           const response=await RecipeModel.find({});// it will return all the data whichis present in Recipesmodel
           res.json(response);
     }catch(err){
        res.json(err);
     }
});


router.post("/", tokenVerify , async (req,res)=>{

  
    try{
        const newRecipe=new RecipeModel(req.body);
        const response=await newRecipe.save();
        res.json(response);
        
    }catch(err){
       res.json(err);
    }
});

router.put("/",tokenVerify,async (req,res)=>{
    
    try{
       const recipe=await RecipeModel.findById(req.body.recipeID);
       const user=await UserModel.findById(req.body.userID);
       user.savedRecipes.push(recipe);
       await user.save();
       res.json({savedRecipes:user.savedRecipes});
        
        
    }catch(err){
       res.json(err);
    }
});

router.get("/savedrecipes/ids/:userID",async (req,res)=>{
    try{
            const user=await UserModel.findById(req.params.userID);
            res.json({savedRecipes:user?.savedRecipes});
    }catch(err){
        res.json(err);
    }
})

router.get("/getsingleitem/:id", async (req,res)=>{
    console.log("fv")
    try{
             const response=await RecipeModel.findById(req.params.id);
             console.log(response);
             res.json(response);
    }catch(err){
        res.json(err);
    }
})
router.get("/savedrecipes/:userID",async (req,res)=>{
    try{
            const user=await UserModel.findById(req.params.userID);
            const savedRecipes=await RecipeModel.find({
                _id:{$in: user.savedRecipes},// in this we are trying to access saved items by particular user
            })
            res.json({savedRecipes});
    }catch(err){
        res.json(err);
    }
})
