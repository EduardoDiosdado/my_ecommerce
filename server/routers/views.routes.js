// Importing modules, setting up the router and instantiate the ProductsManager object.
const express = require("express");
const viewsRouter = express.Router();

//This renders the products view. The logic is being implemented on the front end.
viewsRouter.get("/products",async (req, res) => {
  try {
    res.render("products",{title:"Products"});
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This renders the product details view. The logic is being implemented on the front end.
viewsRouter.get("/productDetails/:pid",async (req, res) => {
  try {
    res.render("productdetails",{title:"Product"});
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This renders the cart  view. The logic is being implemented on the front end.
viewsRouter.get("/cart/:cid",async (req, res) => {
  try {
    res.render("cart",{title:"Cart"});
    
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
