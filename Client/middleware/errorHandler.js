import pkg from "jsonwebtoken";

const { JsonWebTokenError } = pkg;

const errorHandler = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message || "Internal Server Error";
    console.error("Error:", err);

    // Handle Mongoose CastError (Invalid ObjectID)
    if (err.name === "CastError") {
      error = new Error("Resource not found");
      error.statusCode = 404;
    }

    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
      error = new Error("Duplicate field value entered");
      error.statusCode = 400;
    }

    // Handle Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    // Handle JWT Invalid Token Error
    if (err instanceof JsonWebTokenError) {
      error = new Error("Invalid token. Auth failed lmao");
      error.statusCode = 401;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorHandler;
