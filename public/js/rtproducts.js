//Declaring variables
const socket = io();
const productsRT = document.getElementById("products");


//The client listens for the updates on the db so it renders the changes automatically
socket.on("products", (products) => {
  productsRT.innerHTML = ""; //resting the view
  products.forEach((element) => {
    const productTitle = document.createElement("li");
    productTitle.innerHTML = `${element.title}`;
    productsRT.append(productTitle);
  });
});
