import mongoose from "mongoose";


const connectDb = async () => {
  try {
    console.log(process.env.mongo_uri)
    let db = await mongoose.connect(process.env.mongo_uri);

    console.log("connecting the database");
  } catch (error) {
    console.log("Problem while connecting the database", error.message);
    process.exit(1);
  }
};


export default connectDb