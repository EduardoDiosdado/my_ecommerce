//Getting the principal containers out of the DOM.
const productList = document.getElementById("productList");
const productDetails = document.getElementById("productDetails");


//This function renders the list of products available on the store and adds a functionallity to redirect to a details view if indicated.
function renderProducts(param) {
  const productSection = document.createElement("div");
  productSection.innerHTML = param.payload
    .map((product) => {
      return `
    <div>
      <h1>${product.title}</h1>
      <p>${product.description}</p>
      <p>${product.price}</p>
      <button type="submit" id=${product._id} class="btn">Details</button>
      <button type="submit" id=${product._id} class="btnCart">Add to cart</button>
    </div>`;
    })
    .join("");
  productList.append(productSection);

  //With the querySelector it will bring the buttons that have a class btn.
  const buttons = document.querySelectorAll("button.btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      //This method redirects you to the detail view of each product.
      window.location.href = `/productDetails/${button.id}`;
    });
  });

}

//This function is in charge of rendering and implementing the logic for the prev and next buttons used witht the pagination.
function renderButtons(prevLink, nextLink) {
  const buttonsSection = document.createElement("div");
  buttonsSection.innerHTML = `
  <br>
  <br>
  <button type="submit" id="prev" class="prev">Prev page</button>
  <button type="submit" id="next" class="next">Next page</button>`;
  productList.append(buttonsSection);

  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  
  prevButton.addEventListener("click", () => {
    //This method redirects you to the link labled as previous from the object genereated in the /api/products endpoint.
    window.location.href = `/products?${prevLink[1]}`;
  });

  nextButton.addEventListener("click", () => {
    //This method redirects you to the link labled as next from the object genereated in the /api/products endpoint.
    window.location.href = `/products?${nextLink[1]}`;
  });
}


//This function helps determine the query params in the client view so it can be used in the logic to render the products and the one for the prev and nex buttons.
function getUrlParams() {
  //This method extracts the query params
  const url = window.location.search;
  //With the URLSearchParams object the job to extract the params becomes easier.
  const urlParams = new URLSearchParams(url);
  const params = {};
  //Transform each query param with its value into a key value pair.
  for (let pair of urlParams.entries()) {
    params[pair[0]] = pair[1];
  }
  let query = "";
  //Formating the object into a string with the url format.
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      query += `${key}=${value}&`;
    }
  }
  return query
}

//This fuction is feed with the logic of the previous functions and it will run only if the productList element does not exist.
async function fetchProducts() {
  let prevLink;
  let nextLink;
  const query = getUrlParams()

  //The data is being brought from the server
  const response = await fetch(`http://localhost:8080/api/products?${query}`);
  const data = await response.json();
  
  //Only if the pagination has prev and/or next page the previous logic will work.
  if (data.hasPrevPage) {
    prevLink = data.prevLink.split("?");
  }
  if (data.hasNextPage) {
    nextLink = data.nextLink.split("?");
  }

  //Calling the functions
  renderProducts(data);
  renderButtons(prevLink, nextLink);
}

productList && fetchProducts();


//This function only runs when you are redireccted to the detail view.
//The process is mostly the same as the previous one, except from some new fields being added.
async function fetchProduct() {
  const url = window.location.pathname.split("/");
  const id = url[2];
  const response = await fetch(`http://localhost:8080/api/products/${id}`);
  const data = await response.json();
  const productSection = document.createElement("div");
  productSection.innerHTML = data
    .map((product) => {
      return `
      <img src="${product.thumbnail}" class="" alt="...">
      <div>
          <h1>${product.title}</h1>
          <h1>${product.code}</h1>
          <p >${product.price}</p>
          <p >${product.description}</p>
          <p >${product.category}</p>
      </div>`;
    })
    .join("");
  productDetails.append(productSection);
}

productDetails && fetchProduct();
