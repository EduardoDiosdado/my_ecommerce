// Connecting to mongoose models.
const { cartsModel } = require("../models/carts.models.js");
const { productsModel } = require("../models/products.models.js");

class CartsManager {
  // This function returns all the carts present in the collection. In case there is a limit set with a query param it limits the data being sent.
  async getCarts(a) {
    if (a === undefined) {
      return await cartsModel.find();
    }
    return await cartsModel.find().limit(a);
  }

  //This function brings the carts present in the collection by id.
  async getCartById(id) {
    return await cartsModel.find({ _id: id });
  }

  //This function will add a cart to the collection.
  async addCart(arr) {
    return await cartsModel.create(arr);
  }

  //This functions updates the products present in a cart (found by id).
  // In case the product already exists it only adds 1 unit, if not it adds it with a quantity of 1.
  async updateCart(cid, pid) {
    let ind;
    const cart = await cartsModel.find({ _id: cid });
    const newProd = { product: pid, quantity: 1 };
    const Nproducts = cart[0].products;
    Nproducts.forEach((element, index) => {
      if (pid === element.product) {
        ind = index;
      }
    });

    if (!!Nproducts[ind]) {
      Nproducts[ind].quantity++;
    } else {
      Nproducts.push(newProd);
    }

    const result = await cartsModel
      .find({ _id: cid })
      .updateMany({ products: Nproducts });
    return result;
  }

  //This function delete a cart from the collection.
  async deleteCart(id) {
    return await cartsModel.deleteOne({ _id: id });
  }
}

class ProductsManager {
  //This function brings all the products present in the collection. In case there is a limit set with a query param it limits the data being sent.
  async getProducts(a) {
    if (a === undefined) {
      return await productsModel.find();
    }
    return await productsModel.find().limit(a);
  }

  //This function brings the products present in the collection by id.
  async getProductById(id) {
    return await productsModel.find({ _id: id });
  }

  // // Use  only in case the try catch in the route is deleted. Do not use throw as it will stop execution in the server
  // //   async getProductById(id) {
  // //     try {
  // //         return await productsModel.find({ _id: id });
  // //     } catch (error) {
  //         return error
  //         console.log(error.name);
  // //     }

  //   }

  //This function add a product to the collection.
  async addProducts(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    const product = {
      title: title,
      description: description,
      code: code,
      price: price,
      status: status,
      stock: stock,
      category: category,
      thumbnail: thumbnail,
    };
    await productsModel.create(product);
  }

  //This function updates the data of a product.
  async updateProduct(id, product) {
    // const result =  await productsModel.findByIdAndUpdate(id,product)
    return await productsModel.find({ _id: id }).updateMany(product);
  }

  //This function deletes a product from the collection.
  async deleteProduct(id) {
    return await productsModel.deleteOne({ _id: id });
  }
}

// Exporting objects.
module.exports = { ProductsManager, CartsManager };
