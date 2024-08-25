import { Response } from "express"

const express = require("express")
const dotenv = require("dotenv")
dotenv.config() 
const app = express()
const PORT = process.env.PORT || 3000




//Middleware
app.use(express.json());

//Route
app.get("/", (req: Request,res: Response ) => {
    res.send("Welcome to Rulay")
})







app.listen(PORT, ()=> {
    console.log(`Server running on PORT:${PORT}`)
})
