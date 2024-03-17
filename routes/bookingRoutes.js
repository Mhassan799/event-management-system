const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/jwt')
const bookingController = require('../controller/bookingcontroller')

router.post('/add-booking', verifyToken,bookingController.booking)
router.post('/get-booking',verifyToken,bookingController.getBooking)
router.post('/get-dates',bookingController.getDates)


module.exports = router