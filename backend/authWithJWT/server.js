import app from "./app.js";
import connectDb from "./config/db.js";
import { configDotenv } from "dotenv";

configDotenv({path : '.env'})

connectDb().then(()=>{
    const PORT = process.env.PORT || 8080
    app.listen(PORT, ()=>{
        console.log('App is running on the port 8080')
    })
}).catch(()=>{
    console.error("Database connection failed:", error.message);
    process.exit(1);
})



