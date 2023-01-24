//Defining variables
const fs = require("fs");
const pathProducts = "./database/products.json";
const pathCart = "./database/cart.json";
let products = JSON.parse(fs.readFileSync(pathProducts, "utf-8"));
let cart = JSON.parse(fs.readFileSync(pathCart, "utf-8"));

//This function writes over the json file (products)
function writeData(array) {
  fs.writeFileSync(pathProducts, JSON.stringify(array));
}

//This function writes over the json file (cart)
function writeDataCart(array) {
  fs.writeFileSync(pathCart, JSON.stringify(array));
}

//This function brings all the products from the json file
function getProducts() {
  return products;
}

//This function brings the products from the json file filtered by the id
function getProductById(test_id) {
  return products.find(({ id }) => id === test_id) || "Not found";
}

//This function adds a product to the JSON file
function addProducts(
  title,
  description,
  code,
  price,
  status = true,
  stock,
  category,
  thumbnail
) {
  let lastId = products[products.length - 1].id;
  const newProduct = {
    //id: lastId++,No se porqué no funciona esta forma
    id: (lastId = lastId + 1),
    title: title,
    description: description,
    code: code,
    price: price,
    status: status,
    stock: stock,
    category: category,
    thumbnail: thumbnail,
  };
  products.push(newProduct);
  writeData(products);
}

//This function helps to update the data of a product
function updateProduct(productId, updatedProduct) {
  let keys = Object.keys(updatedProduct);

  for (let index = 0; index < keys.length; index++) {
    products[productId][keys[index]] = updatedProduct[keys[index]];
  }

  writeData(products);
}

//This function delete a product and updates the ids
function deleteProduct(test_id) {
  let ind;
  products;
  products.forEach((element, index) => {
    if (element.id === test_id) {
      ind = index;
    }
  });
  products.splice(ind, 1);

  for (ind; ind < products.length; ind++) {
    products[ind].id--;
  }

  writeData(products);
}

//This Function will add products to the cart
function addProductsCart(productsArray) {
  let lastId = cart[cart.length - 1].id;
  const newProduct = {
    //id: lastId++,No se porqué no funciona esta forma
    id: (lastId = lastId + 1),
    products: productsArray,
  };
  cart.push(newProduct);
  writeDataCart(cart);
}

//This function brings the products from the json file filtered by the id
function getProductByIdCart(test_id) {
  return cart.find(({ id }) => id === test_id).products || "Not found";
}

//This function adds products to a cart that already exixts (in case the product is already present it only adds 1 to its quantity)
function addProducts2Cart(cid, pid, productElement) {
  let array = getProductByIdCart(cid);
  let ind;
  array.forEach((element, index) => {
    if (element.product === pid || element.product === productElement.product) {
      ind = index;
    }
  });

  if (!!array[ind]) {
    array[ind].quantity++;
  } else {
    array.push(productElement);
  }

  writeDataCart(cart);
}

//Exporting functions
module.exports = {
  products,
  getProducts,
  getProductById,
  addProducts,
  updateProduct,
  deleteProduct,
  cart,
  addProductsCart,
  getProductByIdCart,
  addProducts2Cart,
};
