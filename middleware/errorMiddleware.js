export const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof Error)) {
    error = new Error(error.message || 'Internal Server Error');
    error.statusCode = error.statusCode || 500;
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    error = new Error(`Duplicate field value: ${Object.keys(err.keyValue).join(', ')}`);
    error.statusCode = 400;
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    error = new Error(messages.join(', '));
    error.statusCode = 400;
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};