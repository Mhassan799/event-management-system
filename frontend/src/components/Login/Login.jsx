import React, { useState } from 'react'
import Layout from '../layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'

const Login = () => {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const navigate = useNavigate()
  const submitHandler = async (e)=>{
    e.preventDefault()
    try{
    const res = await axios.post('http://localhost:5001/api/user/login',{email,password})
    if (res.data.success){
      console.log('loggedin succesfuly')
      message.success('loggedin succesfully')
      localStorage.setItem('token',res.data.token)
      navigate('/')
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
          <form onSubmit={submitHandler}>
              <h1>Login</h1>
              <input type="text"
        value ={email} onChange={(e) => setEmail(e.target.value)}
        
        placeholder="Email address" required />
        <input type="text"
        value ={password} onChange={(e) => setPassword(e.target.value)}
        
        placeholder="password" required />
         <input type="submit" defaultValue="Login" />
         <Link to= '/forget-password'> Forget password?</Link>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login
