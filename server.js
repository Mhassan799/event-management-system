const express = require('express')
const app = express()
require('dotenv').config({path: './config.env'})
port = process.env.PORT || 5001

const dbConnect = require('./db/db')


// import routes 

const userRoutes = require('./routes/userRoutes')
const businessRoutes = require('./routes/businessRoutes')
const reviewRoutes =   require('./routes/reviewRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const activityRoutes = require('./routes/activityRutes')
const cors = require('cors')


// databse calll

dbConnect()

// middlewares
app.use(cors())
app.use(express.json())
app.use('/api/user',userRoutes)
app.use('/api/business',businessRoutes)
app.use('/api/review',reviewRoutes)
app.use('/api/booking',bookingRoutes)
app.use('/api/activity',activityRoutes)




app.listen(port,()=>{
    console.log(`server is runing on ${port}`)
})