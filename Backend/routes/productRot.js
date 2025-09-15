import express from "express";
import { getProductById, getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/ProductCon.js";
import { userVerify } from "../middleware/UserAuth.js";

const routerProduct = express.Router();

routerProduct.get("/products", userVerify, getAllProducts);
routerProduct.get("/products/:id", userVerify, getProductById);
routerProduct.post("/products", userVerify, createProduct);
routerProduct.patch("/products/:id", userVerify, updateProduct);
routerProduct.delete("/products/:id", userVerify, deleteProduct);

export default routerProduct;