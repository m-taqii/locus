import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI,);
        console.log(`MongoDB Connected`);
        return conn;

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDb;