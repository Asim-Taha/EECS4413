import express from "express";
import { login, register, verifyToken } from "../controllers/authController.js";
import errorHandler from "../middleware/errorHandler.js";

const router = express.Router();

// login route
router.post("/login", login);

// register route
router.post("/register", register);

//verify-token route
router.post("/verify-token", verifyToken);

router.use(errorHandler);

export default router;
