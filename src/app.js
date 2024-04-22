// Importaciones
import fs from "fs";
import { products } from "../products-mock.js";

// Productos de ejemplo para agregar y probar el algoritmo.
const [product1, product2, product3, productCambiado] = products;

// Clase para controlar los métodos referentes a los productos.
class ProductManager {
  constructor() {
    this.productsArray = [];
    this.id = 0;
    this.path = `./product.json`;
    this.getting = false;
  }
  addProduct({ title, description, price, thumbnail, code, stock }) {
    this.readFileAndSave();
    let newProduct = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    let codeExists = this.productsArray.some(
      (product) => product.code == newProduct.code
    );

    if (codeExists == false && !Object.keys(newProduct).includes(undefined)) {
      // Validamos que no se repita el code y que los campos sean obligatorios.

      const idsArray = this.productsArray.map((product) => {
        return product.id;
      });
      idsArray.sort((a, b) => a - b); // En caso de que se desordene el array, si sumamos de uno en uno podemos encontrarnos con IDs repetidos, así que, para evitar problemas, lo ordenamos
      if (idsArray != "") {
        // de menor a mayor y a la última posición del array le sumamos uno, para siempre tener un número mayor en la siguiente ID, no importa en qué orden se borre o agregue productos.
        this.id = idsArray[idsArray.length - 1] + 1;
      } else {
        this.id = this.id + 1;
      }
      newProduct = { ...newProduct, id: this.id };
      this.productsArray.push(newProduct);
      this.updateFile(this.productsArray);
      console.log(`El producto de ID "${newProduct.id}" fue agregado.`);
    }
  }
  getProducts() {
    this.getting = true;
    this.readFileAndSave();
    if (this.productsArray.length != 0) {
      console.log(this.productsArray);
    } else {
      console.log("Su array está vacío.");
    }
    this.getting = false;
  }
  getProductById(id) {
    this.getting = true;
    this.readFileAndSave();
    let gottenProduct = this.productsArray.find((product) => product.id == id);
    if (gottenProduct) {
      console.log(gottenProduct);
    } else {
      console.log(`No se encontró el producto que coincida con la id "${id}".`);
    }
    this.getting = false;
  }
  deleteProductById(id) {
    this.readFileAndSave();
    let toDeleteProduct = this.productsArray.find(
      (product) => product.id == id
    );
    if (toDeleteProduct) {
      const forDeleteIndex = this.productsArray.indexOf(toDeleteProduct);
      this.productsArray.splice(forDeleteIndex, 1);
      this.updateFile(this.productsArray);
      console.log(`Producto "${toDeleteProduct.title}" eliminado.`);
    } else {
      console.log(`No se encontró el producto que coincida con la ID "${id}".`);
    }
  }
  updateProduct(id, latestProduct) {
    this.readFileAndSave();
    let toUpdateProduct = this.productsArray.find(
      (product) => product.id == id
    );
    if (toUpdateProduct) {
      latestProduct = { ...latestProduct, id: id };
      let indexToUpdate = this.productsArray.indexOf(toUpdateProduct);
      this.productsArray.splice(indexToUpdate, 1, latestProduct);
      this.updateFile(this.productsArray);
      console.log(`Producto de ID "${toUpdateProduct.id}" actualizado.`);
    } else {
      console.log(`No se encontró el producto que coincida con la ID "${id}".`);
    }
  }
  updateFile(array) {
    fs.writeFileSync(`${this.path}`, JSON.stringify(array));
  }
  readFileAndSave() {
    if (fs.existsSync(this.path)) {
      let fileContent = fs.readFileSync(this.path, "utf-8");
      let parsedFileContent = JSON.parse(fileContent);
      this.productsArray = parsedFileContent;
    } else if (this.getting) {
      console.log("ERROR: El archivo que intentas leer no existe.");
    }
    return this.productsArray;
  }
}

export let exampleManager = new ProductManager(); // ProductManager de ejemplo para probar el algoritmo.

// Métodos a utilizar:

// exampleManager.addProduct();
// exampleManager.getProducts();
// exampleManager.getProductById();
// exampleManager.deleteProductById();
// exampleManager.updateProduct();
