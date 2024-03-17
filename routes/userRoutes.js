const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const {verifyToken, IsAdmin} = require('../middleware/jwt')
/// user register

router.post('/register',userController.register)
// login user
router.post('/login',userController.login)

// forget password
router.post('/forget-password',userController.forgetPassword)


// reset password
router.post('/reset-password',userController.resetPassword)

// get all users 

router.get('/get', userController.getAllUsers)

// get single user
router.get('/get/:userId',verifyToken, userController.getSingleUser)




module.exports = router