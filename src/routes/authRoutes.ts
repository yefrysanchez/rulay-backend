import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = require("../model/User");
const express = require("express");

const JWT_SECRET = process.env.JWT_SECRET || "Default-secret";
import dotenv from "dotenv";

// Initialize dotenv to load environment variables
dotenv.config();

const authRouter = express.Router();
// Register route //////////////////////////////////////////////////////

authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login route ///////////////////////////////////////////////////////

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ msg: "Invalid credentials" });

    // Generate a token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

module.exports = authRouter;
