import { Request, Response } from "express";
import commentRouter from "./routes/commentRoutes";
import mongoose from "mongoose";
const authRoute = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//MONGODB Connection
const MONGODB_IRL: any = process.env.MONGODB_IRL;

mongoose
  .connect(MONGODB_IRL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Middleware
app.use(express.json());

//Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Rulay");
});

app.use("/auth/", authRoute);
app.use("/comment", commentRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
