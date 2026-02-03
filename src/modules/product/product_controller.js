import * as productService from "./product_service.js";

export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProductServices(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search, page, limit } = req.query;
    const data = await productService.getProductsServices(search, page, limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductByIdServices(req.params.id);
    if (!product)
      return res.status(404).json({
        message: "Not found",
      });
    res.Json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProductServices(
      req.params.id,
      req.body,
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProductServices(req.params.id);
    res.json("deleted");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
