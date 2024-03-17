const reviewModel = require('../model/reviewModel')
const businessModel = require('../model/businessModel')


const reviewController = {
    async postReview(req, res) {
        try {
            const user = req.userId
            businessName = req.params.businessName;
            const { comment, stars, postedAt } = req.body
            console.log('comment:', comment, "stars:", stars, 'businessName:', businessName, "postedAt:", postedAt)
            if (!stars) {
                return res.status(400).send({
                    success: false, message: "stars are required"
                })
            }
            if (!businessName) {

                return res.status(400).send({
                    success: false, message: "businessName is required"
                })
            }
            const business = await businessModel.findOne({ name: businessName })
            console.log('busiensname:', business)
            if (!business) {

                return res.status(400).send({
                    success: false,
                    mmessage: "no business exist"

                })
            }
            else {
                console.log('>>>>>>>>>????????')
                const newReview = new reviewModel({
                    userId: user,
                    comment, stars, postedAt,
                    businessName
                })
                await newReview.save()

                const reviews = await reviewModel.find({businessName:businessName})
        console.log('reviews:',reviews)
                const star = reviews.map((s) => {
                    return s.stars
                });
                console.log('star', star)

                // getting length of stars
                const lengthOfStars = star.length;
                console.log('lengthOfStars:', lengthOfStars)

                // adding all stars given in review

                const addAllStars = star.reduce((acc, current) => acc + current, 0);
                console.log('addAllStars:', addAllStars)

                const averageReviews = addAllStars / lengthOfStars;
                console.log('averageReviews:', averageReviews)

                // const business = await businessModel.findOne({ name: businessName })
                // console.log('business', business)

                business.ratings = averageReviews;

                await business.save();

                res.status(200).send({
                    success: true,
                    message: "review posted succesfully",
                    newReview,
                    totalReviews: lengthOfStars,
                    totalStars: addAllStars,
                    ratings: averageReviews,
                })
            }



        } catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },
    async getReviews(req, res) {
        try {
            const reviews = await reviewModel.find()
            res.status(200).send({
                success: true,
                message: "reviews got succesfuly",
                reviews
            })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },

    // get reviews by business name

    async getReviewsByBusiness(req,res){
        try {
            const businessName = req.params.businessName;
            console.log('businessName:',businessName)
            const business = await businessModel.find({name:businessName})
            console.log('business:',business)
            if(business.length === 0 || !business){
                return res.status(400).send({
                    success:false,
                    message:"no business found"
                })
            }
            const reviews = await reviewModel.find({businessName:businessName})
            console.log("reviews:",reviews)
            if(reviews.length==0 || !reviews){
                return res.status(400).send({
                    success:false,
                    message:"no reviews found"
                })
            }
            else{
                res.status(200).send({
                    success:true,
                    message:"reviews got succcesfully",
                    reviews
                })
            }
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },

    async getReviewsByPagination(req, res) {
        try {
            const page = parseInt(req.query.page)
            // const page = req.params.page 
            const limit = 2;
            const reviews = await reviewModel.find({})
                .skip((page - 1) * limit)
                .limit(limit)
            // .sort({createdAt:-1})
            res.status(200).send({
                success: true,
                message: "product got succesfully",
                reviews
            })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },


    // update review

    async updateReview(req, res) {
        try {
            const rId = req.params.rId;
            const review = await reviewModel.findOneAndUpdate(rId, { comment, stars, postedAt, businessName })
            res.status(200).send({
                success: true,
                message: "review updated succesfully",
                review
            })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },


    // delete review

    async deleteReview(req, res) {
        try {
            const rId = req.params.rId
            const review = await reviewModel.findOneAndDelete(rId)
            res.status(200).send({
                sucesss: true,
                message: "review deleted succesully",
                review
            })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success: false,
                message: "something went wrong",
                error: error.message
            })
        }
    },


    async getAverageReviews(req, res) {
        try {
            const { businessName } = req.body;
            const reviews = await reviewModel.find({ businessName: businessName })
            console.log('reviews:', reviews)
            if (!reviews || reviews.length === 0) {
                console.log('no business found')
                return res.status(400).send({
                    success: false,
                    message: "no business found"
                })
            }
            if (reviews) {
                // getting all stars prsent in that soecifuc business 

                const stars = reviews.map((s) => {
                    return s.stars
                });
                console.log('stars', stars)

                // getting length of stars
                const lengthOfStars = stars.length;
                console.log('lengthOfStars:', lengthOfStars)

                // adding all stars given in review

                const addAllStars = stars.reduce((acc, current) => acc + current, 0);
                console.log('addAllStars:', addAllStars)

                const averageReviews = addAllStars / lengthOfStars;
                console.log('averageReviews:', averageReviews)
                res.status(200).send({
                    success: true,
                    message: "got reviews avargae succesfully",
                    businessName: businessName,
                    totalReviews: lengthOfStars,
                    totalStars: addAllStars,
                    avgReviewOnThisBusiness: averageReviews


                })
            }

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "somethiing went wrong",
                error: error.message
            })
        }
    }

}

module.exports = reviewController;