import mongoose from "mongoose";

// Define the comment schema
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true
  }
});

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

// Export the model
module.exports = Comment;
