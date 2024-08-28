import mongoose from "mongoose";

// Define the comment schema
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

// Export the model
module.exports = Comment;
