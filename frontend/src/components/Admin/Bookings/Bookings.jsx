import axios from 'axios';
import React, { useState } from 'react'
import Layout from '../../layout/Layout';
import { message } from 'antd';

const Bookings = () => {
    const [businessName, setBusinessName] = useState("")
    const [bookings, setBookings] = useState([])

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const getBookings = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5001/api/booking/get-booking', { businessName }, config)
            if (res.data.success) {
                setBookings(res.data.bookings)
            }
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            message.error(error.response.data.message)
            setBookings([])
        }
    }
    return (
        <>
            <Layout>

                <div className="container">
                    <div className="form">
                        <form onSubmit={getBookings} >
                            <h1>make boking</h1>
                            <input type="text"
                                value={businessName} onChange={(e) => setBusinessName(e.target.value)}

                                placeholder="BUSINESS NAME" required />

                            <input type="submit" defaultValue="check" />

                        </form>
                    </div>
                </div>






                <h1>Businesses</h1>


                <div className="all-businesse">
                    {
                        bookings?.map((b) => {
                            return (
                                <div className="card my-3" >
                                    <div className="details" key={b._id}>

                                        <h3>Name:{b.businessName}</h3>

                                        <h5>bookingDate:{b.bookingDate}</h5>

                                        


                                    </div>




                                </div>


                            )
                        })
                    }
                </div>


            </Layout>
        </>

    )
}

export default Bookings