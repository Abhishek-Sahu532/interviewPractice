import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("process.env.MONGO_URI", process.env.MONGO_URI);
    let db = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error while connecting the database", error?.message);
    process.exit(1);
  }
};

export default connectDb;
