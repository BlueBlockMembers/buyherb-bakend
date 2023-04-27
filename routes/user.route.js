const router = require('express').Router();
const {
    deleteUser,
    getAllUsers,
    getUserById,
    getUserCount,
    updateUser,
    userLogin,
    userRegister
} = require('./../controllers/user.controller');

router.get(`/`,getAllUsers)

router.get('/:id',getUserById)

router.put('/:id',updateUser)

router.post('/login',userLogin)


router.post('/register',userRegister)


router.delete('/:id',deleteUser)

router.get(`/get/count`,getUserCount)


module.exports = router;