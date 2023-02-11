// Importing modules.
const mongoose = require("mongoose");

// Selecting collection to connect to.
const collection = "carts";

// Setting up the schema for the collection.
const shcema = new mongoose.Schema(
  {
    products: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { versionKey: false }
);

// Declaring the mongoose model.
const cartsModel = mongoose.model(collection, shcema);

// Exporting the model.
module.exports = { cartsModel };
