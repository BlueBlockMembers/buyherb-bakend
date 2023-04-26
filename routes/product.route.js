const router = require('express').Router();
const mongoose = require('mongoose');
const {
    createProduct, deleteProduct, getAll, getCount, getFeatured, getProductById, updateProduct
} = require('../controllers/product.controller');


router.get(`/`, getAll)

router.get(`/:id`, getProductById)

router.post(`/`, createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

router.get(`/get/count`, getCount)

router.get(`/get/featured/:count`, getFeatured)

module.exports = router;