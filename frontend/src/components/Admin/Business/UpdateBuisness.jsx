import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'


const UpdateBuisness = () => {
    const [data,setData]= useState({
        name:"",
        city:"",
        area:"",
        category:""
    })
    const [business,setBusiness]= useState({
        name:"",
        city:"",
        area:"",
        category:""
    })
    const {bId} = useParams()

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const updateBusiness = async()=>{
        try {
            const res = await axios.put(`http://localhost:5001/api/business/update-business/${bId}`,data,config)
            if(res.data.success){
                console.log('update succesfully')
                message.success('update succesfully')
            }
        } catch (error) {
            console.log(error)
            message.error('something went wrong')
        }
    }

    const getSingleBusiness = async ()=>{
        try {
            const res = await axios.get(`http://localhost:5001/api/business/get-single/${bId}`)
            if(res.data.success){
                setData(res.data.business)
                setBusiness(res.data.business)
                console.log('got it')
            }
        } catch (error) {
            console.log(error)
            message.error('something went wrong')
        }
    }
    useEffect(() => {
        getSingleBusiness()
    }, [])
  return (
    <>
    <Layout>
    <div className="container">
        <h1>Update business</h1>
        <input type="text"
        value ={data?.name} onChange={(e) => setData({...data,  name: e.target.value})}
        
        placeholder="name" required />
        <input type="text"
        value ={data?.city} onChange={(e) => setData({...data,  city: e.target.value})}
        
        placeholder="city" required />
        <input type="text"
        value ={data?.area} onChange={(e) => setData({...data,  area: e.target.value})}
        
        placeholder="area" required />
        <input type="text"
        value ={data?.category} onChange={(e) => setData({...data,  category: e.target.value})}
        
        placeholder="category" required />

<button onClick={updateBusiness}>Update</button>

    </div>



    {/* get business details  */}
 
    <div className="card my-5">
        <div className="content">
        <h1>Business Name: {business.name}</h1>
        <p>City:{business.city}</p>
        <p>Area:{business.area}</p>
        <p>Category:{business.category}</p>




        </div>
       </div>
    </Layout>
    
    </>
  )
}

export default UpdateBuisness