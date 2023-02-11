// Importing modules.
const mongoose = require("mongoose");

// Selecting collection to connect to.
const collection = "messages";

// Setting up the schema for the collection.
const shcema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

// Declaring the mongoose model.
const messagesModel = mongoose.model(collection, shcema);

// Exporting the model.
module.exports = { messagesModel };
