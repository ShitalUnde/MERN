import Product from "../models/product.js";
import { validateMongoDBId } from "../utils/validateMongodbId.js";

import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

//get products => api/v1/products
export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.send(product);
};

// export const getProductById = async (req, res, next) => {
//   try {
//     validateMongoDBId(req.params.id);
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.status(200).json({ product });
//     } else {
//       throw new Error("Product not found");
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({ product });
  } else {
    res.status(404).json({
      error: "not found",
    });
  }
});   // best approch

//update update
export const updateProduct = async (req, res) => {
  try {
    validateMongoDBId(req?.params?.id);
    const product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
      new: true,
    });

    if (product) {
      res.status(200).json({
        product,
      });
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    next(error);
  }
};

//delete product => api/v1/products/1
export const deleteProduct = async (req, res) => {
  try {
    validateMongoDBId(req.params.id);
    const product = await Product.findByIdAndDelete(req?.params?.id);
    if (product) {
      res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (err) {
    res.status(404).json({
      error: "Product not found",
    });
  }
};

//create product => api/v1/admin/products
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
};
