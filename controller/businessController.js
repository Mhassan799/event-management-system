const businessModel = require('../model/businessModel')
const reviewModel = require('../model/reviewModel')
const moment = require('moment')


const businessController = {

    async addBusiness(req, res) {
        try {
            const { name, city, area, category } = req.body;
            if (!name || !city || !area || !category) {
                return res.status(400).send({
                    success: false,
                    message: "all feiilds are required to add business"
                })
            }

            const business = await businessModel.findOne({ name })
            console.log('businessName:', business)

            if (business) {

                return res.status(400).send({
                    success: false,
                    message: "this business already exist in our system"
                })
            }

            const newBusiness = new businessModel({
                name, city, area, category
            })
            await newBusiness.save()

            res.status(200).send({
                success: true,
                message: "business added succesfuly",
                newBusiness
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

    async getAllBusiness(req, res) {
        try {
            const businesses = await businessModel.find()
            res.status(200).send({
                success: true,
                message: "all business got succesfuully",
                businesses
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


    // get single business

    async getSingleBusiness(req, res) {
        try {
            const bId = req.params.bId
            const business = await businessModel.findOne({ _id: bId })
            res.status(200).send({
                success: true,
                message: 'got single business succesfully',
                business
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





    // api to update business 


    async updateBusiness(req, res) {
        try {
            const bId = req.params.bId;
            const { name, city, area, category } = req.body;
            const business = await businessModel.findOneAndUpdate({ _id: bId }, { name, city, area, category })
            res.status(200).send({
                success: true,
                message: "business updated succesfully",
                business
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



    //    api to delete business 


    async deleteBusiness(req, res) {
        try {
            const bId = req.params.bId;
            const business = await businessModel.findOneAndDelete({ _id: bId })
            res.status(200).send({
                success: true,
                message: "business deleted succesfully",
                business
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

    async addRatingsInBusiness(req, res) {
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

                const business = await businessModel.findOne({ name: businessName })
                console.log('business', business)

                business.ratings = averageReviews;

                await business.save();

                res.status(200).send({
                    success: true,
                    message: "ratings added sucesfuly succesfully",
                    businessName: businessName,
                    totalReviews: lengthOfStars,
                    totalStars: addAllStars,
                    ratings: averageReviews,



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
    },




    //    get sorted business acprding to ratings

    async getSortedBuisness(req, res) {
        try {
            const business = await businessModel.find({}).sort({ ratings: -1 })
            res.status(200).send({
                success: true,
                message: "business got succesfully",
                business
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "somethiing went wrong",
                error: error.message
            })
        }
    },

    //    filter business based on multipe properties

    async filterBuisness(req, res) {
        try {
            const { category, city, area, ratings } = req.query;

            const business = await businessModel.find({ $or: [{ category: category }, { area: area }, { ratings: { $gte: ratings } }, { city: city }] })

            console.log('business:', business)

            res.status(200).send({
                success: true,
                message: "filtered business got succesfully",
                business
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "somethiing went wrong",
                error: error.message
            })
        }
    },

   

}

module.exports = businessController