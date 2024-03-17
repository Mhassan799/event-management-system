import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import { message } from 'antd';
import axios from 'axios';

const Dates = () => {

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [dates, setDates] = useState([])
    const [month,setMonth] = useState('')
    const [year,setYear] = useState('')



    const getDateAndYear= (date)=>{
        const a = date.split('-');
        // setMonth(a[1])
        // setYear(a[0])
        return a[2];
    }

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const getBusinessByDate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5001/api/booking/get-dates', { startDate, endDate })
            if (res.data.success) {
                setDates(res.data.dates)
            }
        } catch (error) {
            console.log(error)
            // message.error(error.response.data.message)
        }
    }

    useEffect(() => {
        // getBusinessByDate()
    }, [])
    return (
        <>
            <Layout>
                <form onSubmit={getBusinessByDate}>
                    <input type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder='start date'
                    />
                    <input type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder='date till booking needed'
                    />
                    <button >check dates</button>
                </form>

                <div className="container">
                    {dates?.map((d, index) => (
                        <div className="calender d-flex">
                    <div className="card" key={d}>
                        <h4>{getDateAndYear(d.date)}</h4>
                        <p>Bookings:{d.bookings.map((b,i)=>(
                            <p>BusinessName: {b.businessName}</p>
                        ))}</p>
                    </div>
                    </div>
                ))}




                    {/* <div class="calendar">
                        <div class="month">
                            <h2>February 2024</h2>
                        </div>
                        <div class="weekdays">
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                        </div>
                        <div class="days">
                            <div className="row">
                            <div class="day">1</div>
                            <div class="day">2</div>

                            <div class="day">3</div>

                            <div class="day">4</div>
                            <div class="day">5</div>
                            <div class="day">6</div>
                            <div class="day">7</div>
                            </div>
                            <div className="row">
                            <div class="day">1</div>
                            <div class="day">2</div>

                            <div class="day">3</div>

                            <div class="day">4</div>
                            <div class="day">5</div>
                            <div class="day">6</div>
                            <div class="day">7</div>
                            </div>
                            <div className="row">
                            <div class="day">1</div>
                            <div class="day">2</div>

                            <div class="day">3</div>

                            <div class="day">4</div>
                            <div class="day">5</div>
                            <div class="day">6</div>
                            <div class="day">7</div>
                            </div>
                            <div className="row">
                            <div class="day">1</div>
                            <div class="day">2</div>

                            <div class="day">3</div>

                            <div class="day">4</div>
                            <div class="day">5</div>
                            <div class="day">6</div>
                            <div class="day">7</div>
                            </div>


                        </div>
                    </div> */}
                </div>
            </Layout>
        </>

    )
}

export default Dates
