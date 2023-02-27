// Importing modules, setting up the router and instantiate the ProductsManager object.
const express = require("express");
const sessionRouter = express.Router();
const { userModel } = require("../models/users.models.js");



sessionRouter.get("/", (req, res) => {
  res.send("Hola mundo");
});

sessionRouter.post("/", async (req, res) => {
  try {
    const user = req.body;
    const response = await userModel.create(user);
    res.status(200).send({
      message: "User successfully added",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    const error = err.message;
    console.log(error);
  }
});

sessionRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await userModel.findOne({
      email: username,
      password: password,
    });
    if (response) {
      req.session.user = username;
      response.role === 'admin' ? req.session.admin=true:req.session.admin=false
      res.status(200).send({ message: "success", data: response });
    } else {
      res.status(404).send({ message: "error", data: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    const error = err.message;
    console.log(error);
  }
});


sessionRouter.get("/logout", (req, res) => {
    try {
      req.session.destroy()
      res.send({message:'Come back soon!'})
    } catch (err) {
      res.status(500).send({ message: err.message });
      const error = err.message;
      console.log(error);
    }
  });



sessionRouter.get("/profiledata",async (req, res) => {
  try {
    let data2send
    const username = req.session.user
    const response = await userModel.findOne({email: username});
    req.session.admin ? data2send = {name:response.first_name,last_name:response.last_name, email:response.email, role:response.role} : data2send = {name:response.first_name,last_name:response.last_name, email:response.email} 
    res.send({data:data2send})
  } catch (err) {
    res.status(500).send({ message: err.message });
    const error = err.message;
    console.log(error);
  }
});

//Exporting the router
module.exports = {
  sessionRouter,
};
