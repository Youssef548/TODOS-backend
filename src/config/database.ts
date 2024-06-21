import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const connectionOptions: ConnectOptions = {};
  
  const mongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

  try {
    await mongoose.connect(mongoURI as string, connectionOptions);
    console.log("Mongodb Connected...");
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    process.exit(1);
  }
};
export default connectDB;
