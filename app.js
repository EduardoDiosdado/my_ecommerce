//Defining variables
const express = require("express");
const app = express();
const { cartRouter } = require("./routers/cartRouter");
const { productsRouter } = require("./routers/productsRouter");


//Calling middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);


//Server listenning
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
