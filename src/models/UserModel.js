import mongoose from 'mongoose'

const Userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    savedRecipes:[{type:mongoose.Schema.Types.ObjectId, ref:"recipeitems"}]
})
const UserModel=mongoose.model("Users",Userschema)
export default UserModel;