//Defining variables
const express = require("express");
const productsRouter = express.Router();
const dataPer = require("../src/persistence");

//This method will bring all the products, and if given, filter them with a limit
productsRouter.get("/", (req, res) => {
  const limit = req.query.limit;
  let products = dataPer.getProducts();
  if (limit && !isNaN(Number(limit))) {
    res.send(products.slice(0, limit));
  }
  res.send(dataPer.getProducts());
});

//This method will bring the product with the corresponding id
productsRouter.get("/:pid", (req, res) => {
  const id = +req.params.pid;
  res.send(dataPer.getProductById(id));
});

//This method will add a new product to the database
productsRouter.post("/", (req, res) => {
  const _product = req.body;
  dataPer.addProducts(
    _product.title,
    _product.description,
    _product.code,
    _product.price,
    _product.status,
    _product.stock,
    _product.category,
    _product.thumbnail
  );
  res.send("OK");
});

//This method will update a product based only on the conditions given
productsRouter.put("/:pid", (req, res) => {
  const productId = +req.params.pid;
  const _product = req.body;
  dataPer.updateProduct(productId, _product);
  res.send("OK");
});

//This method will delete a product
productsRouter.delete("/:pid", (req, res) => {
  const productId = +req.params.pid;
  dataPer.deleteProduct(productId);
  res.send("OK");
});

//Exporting the router
module.exports = {
  productsRouter,
};
