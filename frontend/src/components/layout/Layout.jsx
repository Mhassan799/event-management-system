import React from 'react'
import Navbar from '../Navbar/Navbar'   

const Layout = ({children}) => {
  return (
    <>

    <Navbar/>
        
      
      <div className="container">
        {children}
      </div>
    </>
  )
}

export default Layout
