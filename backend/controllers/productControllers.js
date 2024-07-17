import Product from "../models/product.js";
// import { validateMongoDBId } from "../utils/validateMongodbId.js";

import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

//get all products => api/v1/products
export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.send(product);
};

//get product by Id
export const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({ product });
  } else {
    return next(new ErrorHandler("Product not Found", 404));
  }
}); // best approch

//update product
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
});

//delete product => api/v1/products/1
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findByIdAndDelete(req?.params?.id);
  if (product) {
    res.status(200).json({
      message: "Deleted",
    });
  } else {
    return next(new ErrorHandler("Product not Found", 404));
  }
});

//create product => api/v1/admin/products
export const createProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
});
