//Defining variables
const express = require("express");
const cartRouter = express.Router();
const dataPer = require("../src/persistence");


//This method will add products to the cart
cartRouter.post('/', (req,res) => {
    const _products = req.body;
    console.log(dataPer.addProductsCart(_products))
    res.send('ok')
})


//This method will return the products present in a cart depending on its id
cartRouter.get('/:cid',(req,res) => {
    const id = +req.params.cid;
    res.send(dataPer.getProductByIdCart(id))
})

//This method adds a product to the products in a cart (if it already exists it only adds 1 to its quantity)
cartRouter.post('/:cid/product/:pid', (req,res) => {
    const _products = req.body;
    const cid = +req.params.cid;
    const _pid = +req.params.pid;
    dataPer.addProducts2Cart(cid,_pid,_products)
    res.send('ok')
})



//Exporting the router
module.exports = {
    cartRouter,
  };
  