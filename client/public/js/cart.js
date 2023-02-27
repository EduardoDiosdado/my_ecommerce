//Getting the principal containers out of the DOM.
const cartProducts = document.getElementById("cartProducts");


//This function is in charge of rendering the products details of the cart.
function renderProductInCart(param) {
    const cartSection = document.createElement("div");
    cartSection.innerHTML = param[0].products
      .map((element) => {
        return `
      <div>
        <h4>${element.product.title}</h4>
        <p>${element.product.description}</p>
        <p>Price: ${element.product.price}</p>
        <p>Amount: ${element.quantity}</p>
        <h4>Total: ${Number(element.quantity) * Number(element.product.price)}</h4>
      </div>
      <br>`;
      })
      .join("");
      cartProducts.append(cartSection);
  
  }


  //This function loads the data in from the server endpoint and calls the previous one to render the products.
  async function fetchCart() {
    const url = window.location.pathname.split("/");
    const id = url[2];
    const response = await fetch(`http://localhost:8080/api/carts/${id}`);
    const data = await response.json();

    console.log(data[0].products);
    
    renderProductInCart(data)

  }

  fetchCart()