import dotenv from "dotenv";
import express from "express";
const app = express();

dotenv.config({ path: "./config/config.env" });
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

import dbConnect from "./config/dbConnect.js";
import errorsMiddleware from "./middleware/errors.js";
//connecting to db
process.on("uncaughtException", (err) => {
  process.exit(1);
});

dbConnect();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

//always after end point

app.use(errorsMiddleware);

const server = app.listen(PORT, () => {
  console.log(
    `Server  running on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(` unhandle err : ${err}`);
  server.close(() => {
    console.log(` Shutting down server due to unhandled rejection error`);
    process.exit(1);
  });
});
