// Importing modules, setting up the router and instantiate the ProductsManager object.
const express = require("express");
const sessionRouter = express.Router();
const { userModel } = require("../models/users.models.js");

sessionRouter.get("/", (req, res) => {
  res.send("Hola mundo");
});


// This endpoint will create a user inside the users collection when called by filling and submitting the form in the frontend
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


// This endpoint verifies if a user already exists in the databse, if so, it inittialize the session within mongoose and delcres de user variable so it is recognized as long as the session is alive.
sessionRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await userModel.findOne({
      email: username,
      password: password,
    });
    if (response) {
      req.session.user = username;
      // The following line code is to determine the access the user has acording to its credentials 
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


// This function destroys the session when called by the frontend
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



// This endpoint will request the non-sensitive data of the user from the database.
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
