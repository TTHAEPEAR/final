const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.listen(3221,()=>{
    console.log("Server Frontend on 3221");
})