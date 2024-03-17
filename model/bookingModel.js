const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

   businessName:{
    type:String,
    required:true
   },
   bookingDate:{
    type:Date,
    required:true
   },
   
})

module.exports = new mongoose.model('booking',bookingSchema)