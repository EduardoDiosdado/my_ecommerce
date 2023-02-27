// Importing modules, setting up the router and instantiate the ProductsManager object.
const express = require("express");
const productsRouter = express.Router();
const DBManager = require("../data/DBManager.js");
const ProductsManager = new DBManager.ProductsManager();

//This method will bring all the products, and if given, filter them with a limit.
// productsRouter.get("/",  async (req, res) => {
//   try {
//     const limit = req.query.limit;
//     res.send(await ProductsManager.getProducts(limit));
//   } catch (err) {
//     res.status(500).send(err.message);
//     const error = err.message;
//     console.log(error);
//   }
// });

//This method will bring all the products, and if given, filter them by category and stock; sort it depending on the instruction (same as the limit); and navigate through the pages.
productsRouter.get("/",  async (req, res) => {
  try {
    const category = req.query.category;
    const stock = req.query.stock;
    const page = req.query.page;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || 1;
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const result = await ProductsManager.getProductsPag(category,stock,page,limit,sort,url)
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});


//This method will bring the product with the corresponding id.
productsRouter.get("/:pid",  (req, res) => {
  try {
    const id = req.params.pid;
    //Using promises
    ProductsManager.getProductById(id).then((docs) => {res.send(docs)})
    
    //Using async await
    // res.send(ProductsManager.getProductById(id));
  } catch (err) {
    res.status(500).send("Product not found");
    const error = err.message;
    console.log(error);
  }
});

//This method will add a new product to the collection.
productsRouter.post("/", async (req, res) => {
  try {
    const _product = req.body;
    const product = await ProductsManager.addProducts(
      _product.title,
      _product.description,
      _product.code,
      _product.price,
      _product.status,
      _product.stock,
      _product.category,
      _product.thumbnail
    );
    res.send({ message: "Product successfully added to the cart", product })
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This method will update the properties of a given product.
productsRouter.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = req.body;
    const result = await ProductsManager.updateProduct(productId, product);
    res
      .status(200)
      .send({ message: "Product updated", acknowledged: result.acknowledged });
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This method will delete a product from the collection.
productsRouter.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const result = await ProductsManager.deleteProduct(id);
    res
      .status(200)
      .send({ message: "Product deleted", acknowledged: result.acknowledged });
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//Exporting the router
module.exports = {
  productsRouter,
};
