const express = require("express");
const app = express();
const cors=require("cors");
const port = 5001;
const db = require("./sequelize/models");


const test = async() => await db['test'].findAll()
app.use(cors(),express.json());
app.listen(port,()=>{
    console.log("서버가 정상적으로 실행되었습니다.");
});

app.get("/",async (req,res)=>{
    res.json(await test());
});