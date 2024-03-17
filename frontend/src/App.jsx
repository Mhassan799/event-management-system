import { useState } from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'


import ForgetPassword from './components/Login/Forget/ForgetPassword'
import ResetPassword from './components/Login/Reset/ResetPassword'
import AddBusiness from './components/Admin/Business/AddBusiness'
import UpdateBuisness from './components/Admin/Business/UpdateBuisness'
import BusinessPage from './pages/BusinessPage'
import BookingPage from './pages/BookingPage'
import Bookings from './components/Admin/Bookings/Bookings'
import Dates from './components/Admin/Bookings/Dates'




function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path = "/"  element= {<Homepage/>}></Route>
        {/* // login */}
        <Route path = "/login"  element= {<Login/>}></Route>
        {/* register  */}
        <Route path = "/register"  element= {<Register/>}></Route>
        {/* forget password  */}
        <Route path = "/forget-password"  element= {<ForgetPassword/>}></Route>
        {/* reset password  */}
        <Route path = "/reset-password"  element= {<ResetPassword/>}></Route>


        {/* for admin */}

        {/* add business */}


        <Route path = "/add-business"  element= {<AddBusiness/>}></Route>
        <Route path = "/business/:bId"  element= {<UpdateBuisness/>}></Route>
        <Route path = "/check-bookings"  element= {<Bookings/>}></Route>
        <Route path = "/check-dates"  element= {<Dates/>}></Route>






    {/* for user  */}
    <Route path = "/busines/:bId/:businessName"  element= {<BusinessPage/>}></Route>
    <Route path = "/book-business"  element= {<BookingPage/>}></Route>

        
  
        




      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
