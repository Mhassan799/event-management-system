const express = require('express')
const router = express.Router()
const businessController = require('../controller/businessController')
const {verifyToken, IsAdmin} = require('../middleware/jwt')


// add business
router.post('/add-business',verifyToken, IsAdmin,businessController.addBusiness)

// get business

router.get('/get',businessController.getAllBusiness)

// get sing;e business
router.get('/get-single/:bId', businessController.getSingleBusiness)
// update business

router.put('/update-business/:bId', verifyToken, IsAdmin, businessController.updateBusiness)


// delete business 

router.delete('/delete-business/:bId', verifyToken, IsAdmin, businessController.deleteBusiness)


// add ratings in business

router.post('/add-ratings',verifyToken, IsAdmin,businessController.addRatingsInBusiness)


// get sorted bsines according to rating

router.get('/get-sorted',verifyToken,businessController.getSortedBuisness)



// get filtered business

router.get('/get-filtered',businessController.filterBuisness)


// get date






module.exports = router