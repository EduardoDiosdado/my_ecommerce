//Libraries
const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require ('connect-mongo')
require("dotenv").config();

//Routers
const { cartsRouter } = require("./routers/carts.routes.js");
const { productsRouter } = require("./routers/products.routes.js");
const { viewsRouter } = require("./routers/views.routes.js");
const { messageRouter } = require("./routers/messages.routes.js");
const { chatRouter } = require("./routers/chat.routes.js");
const { sessionRouter } = require("./routers/sessions.routes.js");

//Models
const { messagesModel } = require("./models/messages.models.js");
const { productsModel } = require("./models/products.models.js");

//Variables and objects
const PORT = process.env.PORT;
const DB_USER = process.env.USER_MONGO;
const DB_PASS = process.env.PASS_MONGO;
const DB_NAME = process.env.DB_MONGO;
const STRING_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.wpq5txg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const messages = [];

//Configuring app and env
const app = express();

//Server listenning
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});

// Websocket
const socketServer = new Server(httpServer);

//Calling middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/public"));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: STRING_CONNECTION,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
  })
);

//Setting view engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.set("view engine", "handlebars");

//Setting routers
try {
  app.use("/api/products", productsRouter);
} catch (error) {
  console.log("Failed at products router");
  throw error.message;
}

try {
  app.use("/api/carts", cartsRouter);
} catch (error) {
  console.log("Failed at carts router");
  throw error.message;
}

try {
  app.use("/chat", chatRouter);
} catch (error) {
  console.log("Failed at chat router");
  throw error.message;
}

try {
  app.use("/messages", messageRouter);
} catch (error) {
  console.log("Failed at messages router");
  throw error.message;
}

try {
  app.use("/api/sessions", sessionRouter);
} catch (error) {
  console.log("Failed at messages router");
  throw error.message;
}

try {
  app.use("/", viewsRouter);
} catch (error) {
  console.log("Failed at views router");
  throw error.message;
}

//Websocket sending changes to the database (based on the changes made by the api/products router)
socketServer.on("connection", async (socket) => {
  console.log("New user connected");
  productsModel.find().then((doc) => {
    socketServer.emit("test", doc);
  });

  socket.on("new-user", (data) => {
    socket.user = data.user;
    socket.broadcast.emit("new-user-connected", {
      user: socket.user,
    });
  });

  socket.on("message", (data) => {
    messages.push(data);
    messagesModel.create(data).then(() => {
      let users = messagesModel.find();
      socketServer.emit("messageLogs", users);
    });
  });
});

//Connecting to DB
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.wpq5txg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  (error) => {
    if (error) {
      console.log("error");
    } else {
      console.log("Connected to DB");
    }
  }
);
