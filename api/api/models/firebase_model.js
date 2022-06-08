const firebase_methods = require('../firebase_methods');

// Singleton design pattern
class FirebaseModel {
    productCollection = 'products';

    constructor() {
        if (this.instance) return this.instance; // Singleton

        // New instance
        FirebaseModel.instance = this;
    }

    //signUp(body) { return firebase_methods.signUp(body); }

    //signIn(body) { return firebase_methods.signIn(body); }

    // Products
    getProducts() { return firebase_methods.get(this.productCollection); }
    getProduct(id) { return firebase_methods.getById(this.productCollection, id); }
    addProduct(product) { return firebase_methods.post(this.productCollection, product); }

    // Search
    searchProducts(term) { return firebase_methods.search(this.productCollection, term) }

    //getById(id) { return firebase.getById(this.collection, id) }

    //add(book) { return firebase.post(this.collection, book) }

    //update(id, book) { return firebase.update(this.collection, id, book) }

    //delete(id) { return firebase.delete(this.collection, id) }
}

module.exports = new FirebaseModel();