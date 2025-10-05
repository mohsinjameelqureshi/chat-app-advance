import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { ENV } from "../utils/env.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${ENV.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected! DB host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connecion error", error);
    process.exit(1);
  }
};

export default connectDB;
