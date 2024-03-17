import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../layout/Layout'
import { message } from 'antd'
import axios from 'axios'

const Register = () => {
  
    const [email, setEmail]= useState('')
    const [name, setName]= useState('')
    const [phone, setPhone]= useState('')
  const [password, setPassword]= useState('')
  const [confirmPassword,setConfirmPassword] = useState("")

  const navigate = useNavigate()
  const submitHandler = async (e)=>{
    e.preventDefault()
    try{
    const res = await axios.post('http://localhost:5001/api/user/register',{name,email,password,phone,confirmPassword})
    // if (res.data.success){
        if((res.status >= 200 && res.status < 300)){
      console.log('registeredd succesfuly')
      message.success('registeredd succesfully')
    //   localStorage.setItem('token:',res.data.token)
      navigate('/login')
    }else{
      message.error(res.data.message)
    }
  }
  catch(error){
    console.log(error)
    message.error('something went wrong')
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
              value ={name} onChange={(e) => setName(e.target.value)}
              
              placeholder="Name" required />
              <input type="text"
        value ={email} onChange={(e) => setEmail(e.target.value)}
        
        placeholder="Email address" required />
        <input type="text"
        value ={password} onChange={(e) => setPassword(e.target.value)}
        
        placeholder="password" required />
        <input type="text"
        value ={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
        
        placeholder="confirmPassword" required />
        <input type="text"
        value ={phone} onChange={(e) => setPhone(e.target.value)}
        
        placeholder="phone" required />
        <input type="submit" defaultValue="Register" />
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}


export default Register
