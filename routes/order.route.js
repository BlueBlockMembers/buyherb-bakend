const router = require('express').Router();
const {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    getTotalSales,
    getOrderCount,
    getUserOrders
} = require('../controllers/order.controller');

router.get(`/`, getAllOrders)

router.get(`/:id`, getOrderById)

router.post('/', createOrder)

router.put('/:id', updateOrder)

router.delete('/:id', deleteOrder)

router.get('/get/totalsales', getTotalSales)

router.get(`/get/count`, getOrderCount)

router.get(`/get/userorders/:userid`, getUserOrders)


module.exports = router;