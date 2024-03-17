import {  message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
    
    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const submitHandler = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5001/api/user/forget-password', {email})
            if(res.data.success){
                message.success('otp sent uccesfully')
                navigate('/reset-password')
            }
        } catch (error) {
            console.log(error)
            // message.error(response.data.message)
        }
    }
  return (
    <>
      <Layout>
        <div className="container">
          <div className="form">
          <form onSubmit={submitHandler}>
              <h1>Forget Password</h1>
              <input type="text"
        value ={email} onChange={(e) => setEmail(e.target.value)}
        
        placeholder="Email address" required />
        
         <input type="submit" defaultValue="submit" />
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ForgetPassword