import { ErrorMessage } from "../helper.js";
import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || ErrorMessage,
  };

  if (err.name === "CastError") {
    const message = `Resource not found ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  console.log(`err name`,err.name)

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(messages.join(', '), 400);
  }

  res.status(error.statusCode).json({
    ...error,

    message: error?.message,
    stack: err?.stack,
  });
};

// import { ErrorMessage } from "../helper.js";
// import ErrorHandler from "../utils/errorHandler.js";

// export default (err, req, res, next) => {
//   let statusCode = err?.statusCode || 500;

//   let error = {
//     message: err?.message || ErrorMessage,
//     stack: err.stack,
//     error: statusCode,
//   };
//   console.log(err.name, err?.path);

//   if (err.name === "CastError") {
//     const msg = `Resource not found ${err?.path}`;
//     error.message = msg;
//     console.log(err);
//   }

//   res.status(statusCode).json({
//     ...error,
//   });
// };
