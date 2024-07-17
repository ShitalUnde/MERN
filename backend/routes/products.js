import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(createProduct);
router.route("/product/:id").get(getProductById);
router.route("/product/:id").post(updateProduct);
router.route("/product/:id").delete(deleteProduct);

export default router;

// exporting router default so in app.js it can import with any name
