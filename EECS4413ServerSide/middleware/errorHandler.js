require("dotenv").config();

const errorHandler = (error, req, res, next) => {
  console.error("Error", error);

  res.status(error.statusCode || 500).json({
    status: "error",
    message: error.message || "Internal server error",
    ...error(
      process.env.NODE_ENV === "development" ? { stack: error.stack } : {} // error stack trace will only be included in the response when running in development mode
    ),
  });
};

export default errorHandler;
