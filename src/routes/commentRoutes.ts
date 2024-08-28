import express from "express";
const Comment = require("../model/Comment");

const commentRouter = express.Router();

/// get All comments
commentRouter.get("/", async (req, res) => {
  const comment = await Comment.find();
  res.status(200).json(comment);
});

/// get Create comment

commentRouter.post("/", async (req, res) => {
  const { comment, post, createdAt, user } = req.body;
  try {
    if (!comment || !post || !createdAt || !user) {
      return res.status(400).json({ msg: "Missing fields" });
    }
    //Comment creation
    const newComment = new Comment({ Comment, post, createdAt, user });
    await newComment.save();

    //Comment create notification
    res.status(201).json({ msg: "Comment created" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default commentRouter;
