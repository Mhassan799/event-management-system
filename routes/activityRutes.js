const express = require('express')
const router = express.Router()
const activityController = require('../controller/activityController')
router.post('/post',activityController.addAdmin)
router.get('/get',activityController.checkActivity)


module.exports = router