const express = require('express');
const url = require('url');
const router = express.Router();
const firebaseModel = require('../models/firebase_model');

// Get cart
router.get('/cart/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.getCart(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Update cart
router.put('/cart/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.updateCart(req.params.id, req.body);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Get all customers
router.get('/customer', async (req, res, next) => {
    try {
        const result = await firebaseModel.getCustomers();
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Get one customer
router.get('/customer/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.getCustomer(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Add a new customer
router.post('/customer', async (req, res, next) => {
    try {
        const result = await firebaseModel.addCustomer(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Update a customer
router.put('/customer/:uid', async (req, res, next) => {
    try {
        const result = await firebaseModel.updateCustomer(req.params.uid, req.body);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Delete a customer
router.delete('/customer/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.deleteCustomer(req.params.id);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Get all products
router.get('/product', async (req, res, next) => {
    try {
        const result = await firebaseModel.getProducts();
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Get one product
router.get('/product/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.getProduct(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Add a new product
router.post('/product', async (req, res, next) => {
    try {
        const result = await firebaseModel.addProduct(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Update a product
router.put('/product/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.updateProduct(req.params.id, req.body);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Delete a product
router.delete('/product/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.deleteProduct(req.params.id);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Get all orders
router.get('/order', async (req, res, next) => {
    try {
        const result = await firebaseModel.getOrders();
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Get one order
router.get('/order/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.getOrder(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Add a new order
router.post('/order', async (req, res, next) => {
    try {
        const result = await firebaseModel.addOrder(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Update a order
router.put('/order/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.updateOrder(req.params.id, req.body);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Delete a order
router.delete('/order/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.deleteOrder(req.params.id);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Search
router.get('/search', async (req, res, next) => {
    try {
        const params = url.parse(req.url, true).query;

        const result = await firebaseModel.searchProducts(params.q);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
});

// Get all users
router.get('/user', async (req, res, next) => {
    try {
        const result = await firebaseModel.getUsers();
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Add a new user
router.post('/user', async (req, res, next) => {
    try {
        const result = await firebaseModel.addUser(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Update a user
router.put('/user/:uid', async (req, res, next) => {
    try {
        const result = await firebaseModel.updateUser(req.params.uid, req.body);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Delete a user
router.delete('/user/:id', async (req, res, next) => {
    try {
        const result = await firebaseModel.deleteUser(req.params.id);
        if (!result) return res.sendStatus(409);
        return res.status(200).json(result);
    }
    catch (e) {
        return next(e);
    }
});

// Get all recipes
router.get('/recipe', async (req, res, next) => {
    try {
        const result = await firebaseModel.getRecipes();
        return res.json(result);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;