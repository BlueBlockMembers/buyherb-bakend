const router = require('express').Router();
const {
    addCategory, updateCategory, deleteCategory, getAllCategory, getCategoryByID
} = require('../controllers/category.controller');

router.get(`/`, getAllCategory)

router.get('/:id', getCategoryByID)


router.post('/', addCategory)


router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)

module.exports = router;