// Importing modules, setting up the router and connecting to mongoose model.
const express = require("express");
const messageRouter = express.Router();
const { messagesModel } = require("../models/messages.models.js");

// This method will send the messages present in the collection.
messageRouter.get("/", async (req, res) => {
  try {
    let users = await messagesModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//Exporting the router
module.exports = {
  messageRouter,
};
