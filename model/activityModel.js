const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
   
  
    
    status: {
        type:String,
        required:true
    },
    creator: {
        type:String,
        required:true
    },
    timeStamp:{
        required:true,
        type:Date,
        default:Date.now
    
    }
    
    
   
})

module.exports = mongoose.model('activity',activitySchema)