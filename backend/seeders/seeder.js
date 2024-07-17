import mongoose from "mongoose";
import Product from "../models/product.js";
import productData from "./data.js";

const seedProducts = async () => {
  try {
    // Ensure DB_LOCAL_URL is define
    await mongoose.connect(
      "mongodb+srv://undeshital04:Sunita.11%40unde@cluster0.hzqqs0i.mongodb.net/MERN-DB"
    );
    console.log("Connection established");

    await Product.deleteMany(); // Delete all previous products
    console.log("All products deleted");

    await Product.insertMany(productData);
    console.log("New products inserted");

    process.exit();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

seedProducts();
