const express = require("express");
const {
	getAllProducts,
	getProductById,
	addProduct,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

productRouter.post("/", addProduct);

module.exports = productRouter;
