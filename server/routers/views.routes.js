// Importing modules, setting up the router and instantiate the ProductsManager object.
const express = require("express");
const viewsRouter = express.Router();

//This function middleware will be in charge of validating if there is already a user present in the session. If not, it will redirect to the login page.
function authSession(req,res,next) {
  if (req.session.user)(
      next()
  )
  else {
      res.redirect('/login')
  }
}

function authLogin(req,res,next) {
  if (!req.session.user)(
      next()
  )
  else {
      res.redirect('/profile')
  }
}


//This renders the products view. The logic is being implemented on the front end.
viewsRouter.get("/products",async (req, res) => {
  try {
    res.render("products",{title:"Products"});
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This renders the product details view. The logic is being implemented on the front end.
viewsRouter.get("/productDetails/:pid",async (req, res) => {
  try {
    res.render("productdetails",{title:"Product"});
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

//This renders the cart  view. The logic is being implemented on the front end.
viewsRouter.get("/cart/:cid",async (req, res) => {
  try {
    res.render("cart",{title:"Cart"});
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});



// This endpoint renders the signup view
viewsRouter.get("/signup",authLogin,async (req, res) => {
  try {
    res.render("signup",{title:"Sign up"});
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});


// This endpoint renders the log in view
viewsRouter.get("/login",authLogin,async (req, res) => {
  try {
    res.render("login",{title:"Log in"});
    
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});

// This endpoint renders the profile view
viewsRouter.get("/profile",authSession,async (req, res) => {
  try {
    res.render("profile",{title:"Your Profile"});
  } catch (err) {
    res.status(500).send(err.message);
    const error = err.message;
    console.log(error);
  }
});


//Exporting the router
module.exports = {
  viewsRouter,
};
