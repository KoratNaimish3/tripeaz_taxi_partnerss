import mongoose from "mongoose";

export const connectDB = async()=>{

    try {
        mongoose.connection.on("connected", ()=>console.log("database conected"))
        await mongoose.connect(process.env.MONGO_URL)

    } catch (error) {
        
        console.log("Error in DB_config" , error)
    }

}