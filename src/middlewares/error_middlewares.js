export const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Define status and message FIRST
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Production: Hide error details
  if (process.env.NODE_ENV === "production") {
    return res.status(status).json({
      success: false,
      message: status === 500 ? "Something went wrong" : message,
    });
  }

  // Development: Show full error details
  res.status(status).json({
    success: false,
    message,
    stack: err.stack, // Show stack trace in development
  });
};
