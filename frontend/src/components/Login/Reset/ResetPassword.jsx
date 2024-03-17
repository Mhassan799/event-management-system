import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../layout/Layout'
import { message } from 'antd'
import axios from 'axios'

const ResetPassword = () => {
    const [otp, setOtp]= useState("")
    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("")

    const navigate = useNavigate()
    const resetHandler =  async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5001/api/user/reset-password',{
                otp,email,newPassword
            })
            if(res.data.success){
                message.success('password updated sucesfully')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            message.error('something went wrng while reseting password')
        }
    }
  return (
    
    <>
    <Layout>
      <div className="container">
        <div className="form">
        <form onSubmit={resetHandler}>
            <h1>Reset Password</h1>
            <input type="text"
      value ={email} onChange={(e) => setEmail(e.target.value)}
      
      placeholder="Email address" required />
      <input type="number"
      value ={otp} onChange={(e) => setOtp(e.target.value)}
      
      placeholder="otp" required />
       <input type="text"
      value ={newPassword} onChange={(e) => setNewPassword(e.target.value)}
      
      placeholder="new password" required />
       <input type="submit" defaultValue="reset now" />
       {/* <Link to= '/forget-password'> Forget password?</Link> */}
          </form>
        </div>
      </div>
    </Layout>
  </>
  )
}

export default ResetPassword