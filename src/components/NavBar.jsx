import React from 'react'
import flag from '../assets/flag.svg'
import admin_image from '../assets/admin_image.svg'
import notification from '../assets/notification.svg'
import nav_search from '../assets/nav_search.svg'
import arrow_down from '../assets/arrow-down.svg'


function NavBar( {pageTitle} ) {
  return (
    <div className='navbar bg-white '>

        {/* NavBar Content */}
        <div className="navbar-content d-flex  align-items-center " style={{zIndex:'1000' }}>
          {/* Navbar title */}
          <p className="fs-5  my-auto fw-bold nav-title" style={{fontFamily:'Montserrat', color:'#5A5A5A', zIndex:'1000'}}> 
            {pageTitle} 
          </p>

          {/* Nav Bar Search */}
          {/* <div className="nav-search-container"> */}
              <div className="search-cover d-flex gap-2 p-3 mx-5 mb-2 align-items-center">
                <img src={nav_search} style={{height:'20px', width:'20px'}} alt="" className="img-fluid " />
                <input type="text" className='nav-input border-0' style={{fontFamily:'Montserrat', fontSize:'12px'}} placeholder='Search here..'/>
              </div>
          {/* </div> */}

          {/* Nav Icons and logos */}
          <div className="nav-right d-flex justify-content-evenly ms-4 align-items-center ">
            <img src={flag} alt="flag" className=" flag-img img-fluid" />
            <div className="notification-div mx-3 d-flex justify-content-center align-items-center">
              <img src={notification} alt="" className="img-fluid" />
            </div>

            <div className="admin-cover d-flex justify-content-evenly align-items-center">
              <img src={admin_image} alt="admin_image " className="nav-pic img-fluid me-1" />
              <div className='admin-text fs-sm ' style={{fontFamily:'Montserrat'}}>Tabe Lilian 
                <img src={arrow_down} alt="" className="img-fluid ms-2" />
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default NavBar