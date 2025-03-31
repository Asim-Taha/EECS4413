import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";
import dotenv from "dotenv";

dotenv.config();

if (!DB_URI) {
  throw new Error(
    "Pls define the MONGODB_URI environment variable inside .env"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;
