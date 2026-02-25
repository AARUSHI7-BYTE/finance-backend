const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.code) {
    statusCode = 400;
    message = err.message;
  }


  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;