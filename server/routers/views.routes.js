// Importing modules, setting up the router and instantiate the ProductsManager object.
const express = require("express");
const viewsRouter = express.Router();
const dataPer = require("../data/FileManager.js");
const testing = require("../app.js");
const DBManager = require("../data/DBManager.js");
const ProductsManager = new DBManager.ProductsManager();

//This method will render the products present on the database. Page needs to refresh to see the changes
viewsRouter.get("/", (req, res) => {
  let products = dataPer.getProducts();
  let productList = [];
  products.forEach((element) => {
    let productTile = (({ title }) => ({ title }))(element);
    productList.push(productTile);
  });
  res.render("home", { productList });
});

//This renders the realtimeproducts view. The rendering will depend on a websocket update.
viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", { title: "Products" });
});


//This renders the realtimeproducts view. The rendering will depend on a websocket update.
viewsRouter.get("/products",async (req, res) => {
  try {
    const category = req.query.category;
    const stock = req.query.stock;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || null;
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const result = await ProductsManager.getProductsPag(category,stock,page,limit,sort,url)
    console.log(result.payload);
    res.render("products", { result });
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//Exporting the router
module.exports = {
  viewsRouter,
};
