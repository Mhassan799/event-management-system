import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { message } from 'antd'
import axios from 'axios'

const BookingPage = () => {
    const [businessName,setBusinessName] = useState("")
    const [bookingDate,setBookingDate] = useState("")


    const token = localStorage.getItem('token');
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};
    const makeBooking = async (e)=>{
        e.preventDefault()
        try{
        const res = await axios.post('http://localhost:5001/api/booking/add-booking',{businessName,bookingDate},config)
        if (res.data.success){
          console.log('booking made succesfuly')
          message.success('booking made succesfully')
          
        }
        else{
          message.error(res.data.message)
        }
      }
      catch(error){
        console.log(error)
        message.error("something went wrong")
      }
      }

    

  return (
    <>
    <Layout>
    <div className="container">
          <div className="form">
          <form onSubmit={makeBooking} >
              <h1>make boking</h1>
              <input type="text"
        value ={businessName} onChange={(e) => setBusinessName(e.target.value)}
        
        placeholder="BUSINESS NAME" required />
        <input type="date"
        value ={bookingDate} onChange={(e) => setBookingDate(e.target.value)}
        
        placeholder="booking date" required />
         <input type="submit" defaultValue="Login" />
  
            </form>
          </div>
        </div>
    </Layout>
    </>
  )
}

export default BookingPage