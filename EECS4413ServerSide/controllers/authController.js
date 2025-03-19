import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// Status: either "success" or "error"

//=========
// Register
//=========
const register = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body; // credentials from the req body
    // check if the uet is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error(" User already exists with this email");
      err.statusCode = 409; //
      throw err;
    }

    // Hash the password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user with transaction
    const [newUser] = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const accessToken = jwt.sign({ id: newUser._id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // commit the transaction
    await session.commitTransaction();
    session.endSession();

    // send response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        accessToken,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    // log unexpected errors
    if (!err.statusCode) {
      console.error("Registration error: ", err);
      err.statusCode = 500;
      err.message = "internal server error";
    }
    next(err); // send it to the error handler in middleware/errorHandler.js
  }
};

//=========
// Login
//=========
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // credentials from the req body

    // check if the user exists
    const user = await User.findOne({ email }); // find the user based on the email

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    // Generate JWT token
    const accessToken = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // send response
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    // Unexpected errors
    if (!err.statusCode) {
      console.error("Login error: " + err);
      err.statusCode = 500;
      err.message = "internal server error";
    }
    next(err); // send it to the error handler in middleware/errorHandler.js
  }
};

export { register, login };
