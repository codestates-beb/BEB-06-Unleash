const express = require("express");
const app = express();
const cors=require("cors");
const port = 5002;

app.use(cors(),express.json());
app.use(express.json());

const indexRouter = require('./routes/index')
const didRouter = require('./routes/did')

app.use('/', indexRouter);
app.use('/did', didRouter);


app.listen(port,()=>{
    console.log("서버가 정상적으로 실행되었습니다.");
});

