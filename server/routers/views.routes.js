// Importing modules, setting up the router and instantiate the ProductsManager object.
const express = require("express");
const viewsRouter = express.Router();
const dataPer = require("../data/FileManager.js");
const testing = require("../app.js");

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

//Exporting the router
module.exports = {
  viewsRouter,
};
