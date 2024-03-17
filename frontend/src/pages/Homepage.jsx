import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

const Homepage = () => {
  const { bId } = useParams();

  const [business, setBusiness] = useState([]);
  const [filterBusiness, setFilterBusiness] = useState([]);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [ratings, setRatings] = useState('');

  const filterBusinesses = async (e) => {
    e.preventDefault();
    try {
      if (!ratings && !city && !category && !area) {
        // If all fields are empty, fetch all businesses
        await getAllBusiness();
      }else{
        
        const res = await axios.get('http://localhost:5001/api/business/get-filtered', {
          params: { ratings, city, area, category }
        });
        if (res.data.success) {
          console.log('Filtered businesses retrieved successfully');
          setBusiness(res.data.business);
        } else {
          message.error(res.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const getAllBusiness = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/business/get');
      if (res.data.success) {
        console.log('All businesses retrieved successfully');
        setBusiness(res.data.businesses);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllBusiness();
  }, []);

  return (
    <>
      <Layout>
        <h1>This is Homepage</h1>
        <div className="container">
          <form className="d-flex" role="search" onSubmit={filterBusinesses}>
            <div>
              <input
                type="number"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                placeholder="rating"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Area"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="all-businesses">
          {business.length > 0 ? (
            business.map((b) => (
              <div className="card" key={b._id}>
                <div className="details">
                  <Link to={`/business/${b._id}/${b.name}`}>
                    <h3>Name: {b.name}</h3>
                  </Link>
                  <h5>Rating: {b.ratings}</h5>
                  <p>City: {b.city}</p>
                  <p>Area: {b.area}</p>
                  <p>Category: {b.category}</p>
                </div>
                <Link to="/book-business">
                  <button className="btn btn-primary">Book This Business</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No businesses found.</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
