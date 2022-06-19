const firebase_methods = require('../firebase_methods');

// Singleton design pattern
class FirebaseModel {
    cartCollection = 'cart';
    orderCollection = 'orders';
    productCollection = 'products';
    recipesCollection = 'recipes';

    constructor() {
        if (this.instance) return this.instance; // Singleton

        // New instance
        FirebaseModel.instance = this;
    }

    // Cart
    getCart(id) { return firebase_methods.getById(this.cartCollection, id); }
    updateCart(id, cart) { return firebase_methods.update(this.cartCollection, id, cart); }

    // Customers
    getCustomers() { return firebase_methods.getCustomers(); }
    getCustomer(uid) { return firebase_methods.getCustomer(uid); }
    addCustomer(customer) { return firebase_methods.addCustomer(customer); }
    updateCustomer(uid, customer) { return firebase_methods.updateCustomer(uid, customer); }
    deleteCustomer(uid) { return firebase_methods.deleteCustomer(uid); }

    // Orders
    getOrders() { return firebase_methods.get(this.orderCollection); }
    getOrder(id) { return firebase_methods.getById(this.orderCollection, id); }
    addOrder(order) { return firebase_methods.post(this.orderCollection, order); }
    updateOrder(id, order) { return firebase_methods.update(this.orderCollection, id, order); }
    deleteOrder(id) { return firebase_methods.delete(this.orderCollection, id); }

    // Products
    getProducts() { return firebase_methods.get(this.productCollection); }
    getProduct(id) { return firebase_methods.getById(this.productCollection, id); }
    addProduct(product) { return firebase_methods.post(this.productCollection, product); }
    updateProduct(id, product) { return firebase_methods.update(this.productCollection, id, product); }
    deleteProduct(id) { return firebase_methods.delete(this.productCollection, id); }

    // Search
    searchProducts(term) { return firebase_methods.search(this.productCollection, term) }

    // Users
    getUsers() { return firebase_methods.getUsers(); }
    addUser(user) { return firebase_methods.addUser(user); }
    updateUser(uid, user) { return firebase_methods.updateUser(uid, user); }
    deleteUser(uid) { return firebase_methods.deleteUser(uid); }

    // Recipes
    getRecipes() { return firebase_methods.getRecipes(this.recipesCollection); }
}

module.exports = new FirebaseModel();