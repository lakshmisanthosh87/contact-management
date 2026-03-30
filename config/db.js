import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connection successful");
    } catch (error) {
        console.error("connection failed", error.message);
    }
}


export default connectDB;