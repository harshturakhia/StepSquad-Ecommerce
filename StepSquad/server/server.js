const app=require("./app");
const dotenv=require("dotenv");
const mongoose=require("mongoose")
const cloudinary =require("cloudinary");

// HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})


// CONFIG
dotenv.config({path:"backend/config/config.env"});

// CONNECTING DATABASE
main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect(process.env.DB_URL);
    console.log('Database Connected!');
}

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})



const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


// UNHANDLED PROMISE REJECTION
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err}`);
    console.log(`Shuuting down the server due to unhandled rejection`);

    server.close(()=>{
        process.exit(1);
    })
})