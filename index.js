require("dotenv").config();

const express = require("express");

//import error router
const errorRouter = require("./routes/error");
const userRouter = require("./routes/user");

const app = express();

// app.get("/", (req, res)=>{
//     res.status(200).json({msg: process.env});
// })

app.use(express.json());

app.use("/user", userRouter);
app.use("*", errorRouter); // Use error router here

app.listen(process.env.HTTP_PORT || 5000, ()=>{
    console.log("HTTP Server Started");
})
