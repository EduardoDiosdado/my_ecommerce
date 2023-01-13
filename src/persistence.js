//Defining variables
const fs = require("fs");
const pathProducts = "./database/products.json";
let products = JSON.parse(fs.readFileSync(pathProducts, "utf-8"));

//This function writes over the json file
function writeData(array) {
  fs.writeFileSync(pathProducts, JSON.stringify(array));
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

//Exporting functions
module.exports = {
  getProducts,
  getProductById,
  products,
  addProducts,
  updateProduct,
  deleteProduct,
};
