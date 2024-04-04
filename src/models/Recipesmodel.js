import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Make sure this matches your actual User model name
    required: true
  }
});

const RecipeModel = mongoose.model("recipeitems", RecipeSchema);

export default RecipeModel;
