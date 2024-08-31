import express from "express";
const Comment = require("../model/Comment");

const commentRouter = express.Router();

/// get All comments
commentRouter.get("/", async (req, res) => {
  const comment = await Comment.find();
  res.status(200).json(comment);
});

/// Post/ Create comment

commentRouter.post("/", async (req, res) => {
  const { comment, postId, userName, email } = req.body;
  try {
    if (!comment || !postId || !userName || !email) {
      return res.status(400).json({ msg: "Missing fields" });
    }
    //Comment creation
    const newComment = new Comment({ comment, postId, userName, email });
    await newComment.save();

    //Comment create notification
    res.status(201).json({ msg: "Comment created" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/// Put/  Edit comment

commentRouter.put("/", async (req, res) => {
  const { _id, comment } = req.body;
  try {
    if (!_id || !comment) {
      return res.status(400).json({ msg: "Error, please try again." });
    }
    //Comment edit
    const findComment = await Comment.updateOne({ _id }, {$set: {comment}});
   
    //Comment create notification
    res.status(201).json({ msg: "Comment updated" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/// Delete/  delete comment

commentRouter.delete("/", async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res.status(400).json({ msg: "Error, please try again." });
    }
    //Comment deleted
    const comment = await Comment.deleteOne({ _id });
    //Comment create notification
    res.status(201).json({ msg: "Comment deleted" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default commentRouter;
