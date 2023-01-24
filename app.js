//Defining variables
const express = require("express");
const {Server} = require("socket.io");
const handlebars = require("express-handlebars");
const { cartRouter } = require("./routers/cartRouter");
const { productsRouter } = require("./routers/productsRouter");
const { viewsRouter } = require("./routers/viewsRouter");
const dataPer = require("./src/persistence");
let products = dataPer.getProducts()

const app = express();
//Server listenning
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port: 8080");
  
});
const socketServer = new Server(httpServer);




//Calling middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


//Websocket sending changes to the database (based on the changes made by the api/products router)
socketServer.on("connection", (socket) => {
  console.log("Connected");
  socket.emit('products',products)
});







