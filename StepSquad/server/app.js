const cors=require("cors")
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const fileupload=require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const cookieParser=require("cookie-parser");


app.use(cookieParser());

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileupload());


// ROUTE IMPORTS
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");


app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)

// MIDDLEWARE FOR ERROR
app.use(errorMiddleware);


module.exports=app;