// Importing modules.
const mongoose = require("mongoose");

// Selecting collection to connect to.
const collection = "carts";

// Setting up the schema for the collection.
const shcema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: {
            type: Number
          }
        },
      ],
      required: true,
      default: [],
    },
  },
  { versionKey: false }
);



//This options allow the population to happen when using find and findOne methods.
shcema.pre("find", function () {
  this.populate("products.product");
});

shcema.pre("findOne", function () {
  this.populate("products.product");
});


// Declaring the mongoose model.
const cartsModel = mongoose.model(collection, shcema);

// Exporting the model.
module.exports = { cartsModel };
