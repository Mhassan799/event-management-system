import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'


const BusinessPage = () => {
    const {businessName}= useParams()
    const {bId} = useParams()
    const [business,setBusiness]= useState({
        name:"",
        city:"",
        area:"",
        category:""
    })
    const [reviews,setReviews]= useState([])

    // for posting reviews
    const [comment,setComment] = useState("")
    const[stars,setStars] = useState("")
    // const [businessName,setBusinessName] = useState("")
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };


    const getSingleBusiness = async ()=>{
        try {
            const res = await axios.get(`http://localhost:5001/api/business/get-single/${bId}`)
            if(res.data.success){
                
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


    const postReview = async (e)=>{
        e.preventDefault()
        try {
           const res = await axios.post(`http://localhost:5001/api/review/post/${businessName}`,{comment, stars,businessName},config)
           if(res.data.success){
            console.log('posted sucessfuuly')
            message.success("review posted sucesfully")
            getReviews()
           } 
        } catch (error) {
            console.log(error)
            message.error('something went wrong')
        }
    }

    const getReviews = async ()=>{
        try {
            const res = await axios.get(`http://localhost:5001/api/review/get-review/${businessName}`)
            if(res.data.success){
                setReviews(res.data.reviews)
                console.log("reviews got succesfully")
            }
        } catch (error) {
            console.log(error)
            message.error('something went wrong')
        }
    }

    useEffect(() => {
        getReviews()
    }, [])
  return (

<>
<Layout>

<div className="card my-5">
        <div className="content">
        <h1>Business Name: {business.name}</h1>
        <h3>Rating:{business.ratings}</h3>
        <p>City:{business.city}</p>
        <p>Area:{business.area}</p>
        <p>Category:{business.category}</p>
        <p>Over All Rating:{business.ratings}</p>


        {/* {reviews?.map((r)=>{
            return(
                
                )
            })} */}
{
    reviews?.map((item,i)=>(  
        <div className="reviews d-flex px-2" key={i}>
        <p >Review : {item?.comment}...</p>  
        <p >Stars : {item?.stars}....</p>
        <p>Date : {item?.postedAt}</p>
        </div>

    ))
}


        </div>
        {/* <Link>
        <button className='btn btn-success'>Book this business</button>
        </Link> */}
       </div>

       {/* post a review */}


       <div className="container">
          <div className="form">
          <form onSubmit={postReview}>
              <h1>Post Review</h1>
              <input type="text"
        value ={comment} onChange={(e) => setComment(e.target.value)}
        
        placeholder="comment"  />
        <input type="number"
        value ={stars} onChange={(e) => setStars(e.target.value)}
        
        placeholder="stars" required />
        <input type="text"
        value ={businessName} 
        
        placeholder="businessName" required />
        
         <input type="submit" defaultValue="post" />
        
            </form>
          </div>
        </div>

</Layout>

</>
    )
}

export default BusinessPage