const express = require('express')
const router = express.Router()
const reviewController = require('../controller/reviewController')
const {verifyToken, IsAdmin} = require('../middleware/jwt')


// add business
router.post('/post/:businessName',verifyToken,reviewController.postReview)

// get business

router.get('/get',reviewController.getReviews)


// get reviews by  business

router.get('/get-review/:businessName',reviewController.getReviewsByBusiness)

// update reviews

router.put('/update-review',verifyToken, IsAdmin,reviewController.updateReview)


// delete review

router.delete('/delete-review',verifyToken, IsAdmin,reviewController.deleteReview)


// pagination till 10

 router.get('/get-reviews',reviewController.getReviewsByPagination )

 // get avarage of reviews

 router.get('/get-avg-reviews', reviewController.getAverageReviews)




module.exports = router