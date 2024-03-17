const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
},
businessName:{
    type:String,
    required:true
},
comment:{
    type:String,
    // required:true
},
stars: {
    type: Number,
    required: true,
    min: 1, // Minimum value for stars
    max: 5, // Maximum value for stars
},
postedAt: {
    type: Date,
    default: Date.now
}
})

module.exports = mongoose.model('reviews',reviewSchema)
