import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/UserRoute.js";
import { recipeRouter } from "./routes/Reciperoute.js";
const app=express();


app.use(express.json());// it is used to parse the incoming requests
app.use(cors());


app.use("/auth",UserRouter);// seperating the routes in api  and this will act as middleware
app.use("/recipes",recipeRouter);



mongoose.connect("mongodb+srv://pavanponnana1:F0DEcaunoL2TIKOH@cluster0.3wjekog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
.then(() => {
  console.log("Connected to MongoDB");}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);});


app.listen(4001,()=>{// it is used to start the server
    console.log("nfhbvhfebv")
})