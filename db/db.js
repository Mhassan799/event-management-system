const mongoose = require('mongoose')

async function dbConnect(){
    try {
        
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true
        })
        console.log('databse connected succesfully')
    } 
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports= dbConnect;