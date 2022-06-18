const express = require('express');
const url = require('url');
const router = express.Router();
const firebaseModel = require('../models/firebase_model');

// Sign in
router.post('/signin', async (req, res, next) => {
    try {
        const result = await firebaseModel.addProduct(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
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

// Delete a product
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