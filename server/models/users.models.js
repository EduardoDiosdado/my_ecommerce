// Importing modules.
const mongoose = require("mongoose");

// Selecting collection to connect to.
const collection = "users";

// Setting up the schema for the collection.
const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role:{
    type: String,
    requried: false,
    default: 'user'
  }
},{ versionKey: false });

const userModel = mongoose.model(collection, schema);

// Exporting the model.
module.exports = { userModel };
