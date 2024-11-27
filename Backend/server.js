const express = require("express");
const morgan  = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const connectDB = require("./Config/db")

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParse.json());
app.use(express.json());


const productroute = require("./Routes/product")
app.use('/api',productroute);
//app.use("/api",express.static(path.join(__dirname, 'uploads')));

const userroute = require("./Routes/user")
app.use('/user',userroute);


app.listen(5000,() => console.log("Server is Running on 5000"));