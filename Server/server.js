import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/productRoutes.js";
import loanRoutes from './routes/loan.js';
import cartRoutes from "./routes/cartRoutes.js";
import reviewRoutes from "./routes/review.js";
//middleware
import authenticateToken from "./middleware/auth/jwt.js";
// Error handler
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",  // ✅ frontend origin
  credentials: true                 // ✅ allows cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", authenticateToken, userRoutes);
app.use("/api/products", authenticateToken, productRoutes); // ✅ Protect it
app.use('/api/loan',authenticateToken, loanRoutes);
app.use("/api/cart",authenticateToken, cartRoutes);
app.use("/api/review",authenticateToken, reviewRoutes);



app.get("/", (req, res) => {
  res.send("Backend is running brooo");
});

if (!process.env.DB_URI) {
  console.error("DB_URI is missing in .env file.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB Connected (lfggg)");
  } catch (err) {
    console.error("MongoDB Connection Error: 🥺 ", err);
    process.exit(1);
  }
};

connectDB();

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
