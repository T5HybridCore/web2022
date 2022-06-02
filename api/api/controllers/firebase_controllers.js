const express = require('express');
const router = express.Router();
const firebaseModel = require('../models/firebase_model');

// Get all products
router.get('/product/', async (req, res, next) => {
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
router.post('/product/', async (req, res, next) => {
    try {
        const result = await firebaseModel.addProduct(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;