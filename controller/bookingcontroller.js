const bookingModel = require('../model/bookingModel')
const businessModel = require('../model/businessModel')
const moment = require('moment')

const bookingController = {

    async booking(req,res){
        try {
            const user = req.userId
            console.log('user:',user)
            const {businessName,bookingDate} = req.body
            if(!businessName || !bookingDate ){
                return res.status(400).send({
                    success:false,
                    message:"all feilds are required"
                })
            }

            const business = await businessModel.findOne({name:businessName})
            console.log('business:',business)
            if(!business){
                return res.status(400).send({
                    success:false,
                    message:"no business found"
                })
            }

            const booking = await bookingModel.find({businessName:businessName})
            console.log('booking:',booking)

            // const currentDate = new Date()
            const currentDate = moment().format("YYYY-MM-DD")
            const formatedBookingDate = moment(bookingDate).format("YYYY-MM-DD")
            console.log('formatedBookingDate:',formatedBookingDate)
                console.log('bookingDate:',bookingDate )
                console.log('currentDate:',currentDate )

              
            if(booking.length === 0){
                console.log('arha h')
                if (moment(bookingDate).isBefore(currentDate)) {
                    return res.status(400).send({
                        success: false,
                        message: "This date is not available because its earlier than current date"
                    });
                }
                else if(moment(bookingDate).isSameOrAfter(currentDate)){
                    console.log('aya')
                    const newBooking = new bookingModel({
                        businessName,bookingDate:formatedBookingDate
                    })
                    await newBooking.save()
        
                    res.status(200).send({
                        success:true,
                        message:"booking made succesfully",
                        newBooking
                    })
                }
               
                
            }
            else{
                // const checkDate = booking.bookingDate.find((date)=> date =<  )

                const isBookingDateValid = booking.some(bookingItem => {
                    console.log('bookingItem.bookingDate:',bookingItem.bookingDate)
                    console.log('bookingDate:',bookingDate)
                    const formateBookingItem = moment(bookingItem.bookingDate).format("YYYY-MM-DD")
                    console.log('formateBookingItem:',formateBookingItem)
                    return moment(formateBookingItem).isSame(moment(formatedBookingDate));
                });
                console.log('isBookingDateValid:',isBookingDateValid)


                if (isBookingDateValid === true) {
                    return res.status(400).send({
                        success: false,
                        message: "There is already a booking for this date or earlier"
                    });
                }
                else {
                    const newBooking = new bookingModel({
                        businessName,
                        bookingDate:formatedBookingDate
                      
                    });
                    await newBooking.save();

                    return res.status(200).send({
                        success: true,
                        message: "Booking made successfully - 2",
                        newBooking
                    });
                }

            }

            

        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"something went wrong",
                error:error.message
            })
        }
    },


    // get bookings based on business name

    async getBooking(req,res){
        try {
            const {businessName} = req.body
            const bookings = await bookingModel.find({businessName:businessName})
            console.log('bookings:',bookings)
                if(!bookings || bookings.length === 0){
                    return res.status(400).send({
                        success:false,
                        message:"no bookings availabe for this business"
                    })
                }else{
                    res.status(200).send({
                        success:true,
                        message:"business got succesfully",
                        bookings
                    })
                }
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"something went wrong",
                error:error.message
            }) 
        }
    },
    async getDates(req, res) {
        try {
            const { startDate, endDate } = req.body;
            console.log('startDate:', startDate);
            console.log('endDate:', endDate);

        
            const currentDate = endDate ? moment(endDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

            // format startdate and currentdate / enddate
            const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
            const formatedCurrentDate = moment(currentDate).format('YYYY-MM-DD')
            console.log('formattedStartDate:', formattedStartDate);
            console.log('formatedCurrentDate:', formatedCurrentDate);



            const bookings = await bookingModel.find({
                bookingDate: { $gte: formattedStartDate, $lte: formatedCurrentDate }
            });
            console.log('bookings:', bookings);
            if(bookings.length ===0 || !bookings){
                return res.status(400).send({
                    success:false,
                    message:"noo booking found"
                })
            }

            // Array to store the dates
            const dates = [];

           
            for (let date = moment(formattedStartDate); date.isSameOrBefore(formatedCurrentDate, 'day'); date.add(1, 'days')) {
               const formatedDate = date.format('YYYY-MM-DD')
               const bookingsForDate = bookings.filter(booking =>moment(booking.bookingDate).isSame(formatedDate, 'day'))

               const dateObject ={
                date:formatedDate,
                bookings:bookingsForDate.map(b=>(  {
                    businessName: b.businessName
                } ))
               }
                // dates.push({ date: date.format('YYYY-MM-DD') });
                dates.push(dateObject)
            }

            console.log(dates);

           
           res.status(200).send({
            success:true,
            startDate:formattedStartDate,
            BookingsTillDate:currentDate,
            dates
           })
            // res.json({ formattedStartDate, currentDate: currentDate.format('YYYY-MM-DD'), dates });
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: "something went wrong"
            })
        }
    }
}

module.exports =bookingController