const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

    var Schema = mongoose.Schema,

    businessSchema = new Schema({
        name:{
            type:String,
            required:true
        },
        slug: { type: String, slug: "name" },
        area:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        ratings:{
            type:Number,
            default:0
        }

    })
    module.exports = mongoose.model('business',businessSchema)