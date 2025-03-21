import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config/env.js";

console.log("DB_URI from env:", process.env.DB_URI);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js"; // ✅ Added

const app = express();
//const PORT = process.env.PORT || 5500;

app.get("/", (req, res) => {
  res.send("Backend is running brooo");
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // ✅ Added

if (!process.env.DB_URI) {
  console.error("DB_URI is missing in .env file.");
  process.exit(1);
}

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB Connected (lfggg)"))
  .catch((err) => {
    console.log("MongoDB connection Error: ", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

console.log("PORT from env.js:", PORT);
console.log("PORT from process.env:", process.env.PORT);

//app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
