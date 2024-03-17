const mongoose = require('mongoose')

var slug = require('mongoose-slug-updater')
    mongoose.plugin(slug)

    var Schema = mongoose.Schema,
userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug: { type: String, slug: "name" },

    email:{
        type:String,
        required:true
    },
    slug: { type: String, slug: "email" },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number
        
    },
    role:{
        type:Number,
        default:0
    }

})


module.exports= mongoose.model('users',userSchema)