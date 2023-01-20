//Defining variables
const express = require("express");
const viewsRouter = express.Router();
const dataPer = require("../src/persistence");


viewsRouter.get("/", (req, res) => {
  let products = dataPer.getProducts();
  let productList = [];
  products.forEach((element) => {
    let productTile = (({ title }) => ({ title }))(element);
    productList.push(productTile);
  });
  res.render("home", { productList });
});



// //This method will add a new product to the database
// viewsRouter.get("/realtimeproducts", (req, res) => {
//   let products = dataPer.getProducts();
//   let productList = [];
//   products.forEach((element) => {
//     let productTile = (({ title }) => ({ title }))(element);
//     productList.push(productTile);
//   });
//   res.render("home", { productList });
// //   let io = req.app.get('socketio');
// //   io.on('connection',(socket) => {
// //     console.log('connected');
// //     socket.emit('test','Hola')
// //   })
  
// });

// viewsRouter.post("/realtimeproducts", (req, res) => {
//   const _product = req.body;
//   dataPer.addProducts(
//     _product.title,
//     _product.description,
//     _product.code,
//     _product.price,
//     _product.status,
//     _product.stock,
//     _product.category,
//     _product.thumbnail
//   );
// });

// //This method will update a product based only on the conditions given
// viewsRouter.put("/realtimeproducts/:pid", (req, res) => {
//   const productId = +req.params.pid;
//   const _product = req.body;
//   dataPer.updateProduct(productId, _product);
//   res.send("OK");
// });

// //This method will delete a product
// viewsRouter.delete("/realtimeproducts/:pid", (req, res) => {
//   const productId = +req.params.pid;
//   dataPer.deleteProduct(productId);
//   res.send("OK");
// });

//Exporting the router
module.exports = {
  viewsRouter,
};
