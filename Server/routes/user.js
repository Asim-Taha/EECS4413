import express from "express";
import authenticateToken from "../middleware/auth/jwt.js"; // unused rn
import userController from "../controllers/userController.js";
import errorHandler from "../middleware/errorHandler.js";

const router = express.Router();

// User resource routes
router.get("/user", authenticateToken, userController.getUserById);

router.use(errorHandler);

export default router;
