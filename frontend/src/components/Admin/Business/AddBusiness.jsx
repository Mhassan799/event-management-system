import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import axios from 'axios'
import { message } from 'antd'
import { Link, useParams } from 'react-router-dom'


const AddBusiness = () => {
    const {bId} = useParams()

        const [name, setName] = useState("")
        const [city, setCity] = useState("")
        const [area, setArea] = useState("")
        const [category, setCategory] = useState("")
        const [business, setBusiness] = useState([])
        

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const createBusiness = async(e)=>{
            e.preventDefault()
            try {
                const res = await axios.post('http://localhost:5001/api/business/add-business',{name,city,area,category}, config)
                if(res.data.success){
                    console.log('business added sycccesfully')
                    message.success(res.data.message)
                    getAllBusiness()
                }
                else{
                message.error(error.response.data.error)

                }
            } catch (error) {
                console.log(error)
                message.error(error.response.data.error)
            }
        }
        const dleteBusiness = async (bId) =>{
            try {
                const res = await axios.delete(`http://localhost:5001/api/business/delete-business/${bId}`,config)
                if(res.data.success){
                    console.log('business deleted sucesfully')
                    message.success('business deleted succesfully')
                }
            } catch (error) {
                console.log(error)
                message.error('something went wrong')
            }
        }
        const getAllBusiness = async ()=>{
            try {
                const res = await axios.get('http://localhost:5001/api/business/get')
                if(res.data.success){
                    console.log('got succesfully ')

                    setBusiness(res.data.businesses)
                    // message.success(res.data.message)

                }
                else{
                    message.error(error.response.data.message)
    
                    }
            } catch (error) {
                console.log(error)
                message.error(error.response.data.error)
            }
        }


        useEffect(() => {
        getAllBusiness()
        }, [])
  return (

    <>
    <Layout>
    <div className="container">
          <div className="form">
          <form onSubmit={createBusiness}>
              <h1>Login</h1>
              <input type="text"
        value ={name} onChange={(e) => setName(e.target.value)}
        
        placeholder="enter business name" required />
        <input type="text"
        value ={city} onChange={(e) => setCity(e.target.value)}
        
        placeholder="city" required />
         <input type="text"
        value ={area} onChange={(e) => setArea(e.target.value)}
        
        placeholder="area" required />
         <input type="text"
        value ={category} onChange={(e) => setCategory(e.target.value)}
        
        placeholder="category" required />
         <input type="submit" defaultValue="submit" />
         {/* <Link to= '/forget-password'> Forget password?</Link> */}
            </form>
          </div>
        </div>


        <div className="all-businesse">
            {
                business?.map((b,i)=>{
                    return (
                        <div className="card" >
                            <div className="details"  key={b._id}>
                            
                                <h3>Name:{b.name}</h3>
                                <p>city:{b.city}</p>
                                <p>area:{b.area}</p>
                                <p>category:{b.category}</p>


                            </div>
                            <div className="buttons">
                                <Link 
                            key={b._id}
                            to = {`/business/${b._id}`}>
                            <button className='btn btn-primary'>edit</button>
                            </Link>

                            <button className='btn btn-danger' onClick={()=>dleteBusiness(b._id)}>delete</button>


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

export default AddBusiness