import fs from "fs";
const { readFileSync, writeFileSync } = fs;

const cartFilePath = "./data/carrito.json";

export default class CartManager {
  constructor() {
    this.cartFilePath = cartFilePath;
    this.cart = this.getCart();
  }

  getCart() {
    try {
      const data = readFileSync(this.cartFilePath, "utf8");
      const cart = JSON.parse(data);
      return cart;
    } catch (error) {
      return [];
    }
  }

  saveCart() {
    try {
      writeFileSync(this.cartFilePath, JSON.stringify(this.cart, null, 2));
    } catch (error) {
      throw new Error("Error al guardar el carrito");
    }
  }

  createCart() {
    const cartId = this.generateCartId();
    const cart = {
      id: cartId,
      products: [],
    };
    this.cart.push(cart);
    this.saveCart();
    return cart;
  }

  generateCartId() {
    const usedIds = this.cart.map((cart) => cart.id);
    let newId = 1;
    while (usedIds.includes(newId)) {
      newId++;
    }
    return newId;
  }

  getCartById(cartId) {
    const cart = this.cart.find((cart) => cart.id === cartId);
    return cart;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      return { error: "Carrito no encontrado" };
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCart();
    return cart;
  }
}