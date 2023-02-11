// Importing modules, setting up the router and instantiate the CartsManager object.
const express = require("express");
const cartsRouter = express.Router();
const DBManager = require("../data/DBManager.js");
const CartsManager = new DBManager.CartsManager();

//This method will return the carts, and if given, filter them with a limit.
cartsRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    res.send(await CartsManager.getCarts(limit));
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This method will return the cart with the corresponding id.
cartsRouter.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    res.send(await CartsManager.getCartById(id));
  } catch (err) {
    res.status(500).send("Cart not found");
    const error = err.message;
    console.log(error);
  }
});

//This method will add a cart to the collection.
cartsRouter.post("/", async (req, res) => {
  try {
    const arr = req.body;
    const cart = await CartsManager.addCart(arr);
    res.send({ message: "Cart successfully added", cart });
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This method adds a product to the cart found by its id. If it already exists it only adds 1 to its quantity, else it will create it with an intial quantity of 1 unit.
cartsRouter.post("/:cid/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await CartsManager.updateCart(cid, pid);
    res.send({
      message: "Cart successfully updated",
      acknowledged: result.acknowledged,
    });
  } catch (err) {
    res.status(500).send("Cart not found");
    const error = err.message;
    console.log(error);
  }
});

//This method will delete a cart.
cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const result = await CartsManager.deleteCart(id);
    res
      .status(200)
      .send({ message: "Cart deleted", acknowledged: result.acknowledged });
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//Exporting the router.
module.exports = {
  cartsRouter,
};
