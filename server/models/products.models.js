// Importing modules.
const mongoose = require("mongoose");

// Selecting collection to connect to.
const collection = "products";

// Setting up the schema for the collection.
const shcema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { versionKey: false }
);

// Declaring the mongoose model.
const productsModel = mongoose.model(collection, shcema);

// Exporting the model.
module.exports = { productsModel };
