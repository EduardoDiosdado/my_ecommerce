// Importing modules and setting up the router.
const express = require("express");
const chatRouter = express.Router();

// Rendering view
chatRouter.get("/", (req, res) => {
  res.render("chat", { title: "Chatbox" });
});

//Exporting the router
module.exports = {
  chatRouter,
};
