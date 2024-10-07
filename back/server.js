const express = require("express");
const json = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const essayRoutes = require("./routes/essay")

const app = express();

// dotenv config
dotenv.config();

// connect to database
connectDB();

// middleware
app.use(cors()); 
app.use(express.json());


// routes
app.use("/api/v1", essayRoutes);

app.get("/", (req,res)=>{
    res.send("hi there!");
})
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`app running on ${port}`)
});