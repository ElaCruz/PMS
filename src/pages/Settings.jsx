import React from 'react'
import { NavLink } from 'react-router-dom'
import NavBar from '../components/NavBar'
import sidebar_logo from '../assets/sidebar_logo.svg'
import SettingSideBar from '../components/SettingSideBar'
import admin_image from '../assets/admin_image.svg'


function Settings() {
  return (
    <div>

      {/* What shows in smaller screens */}
      <div className="d-flex container-fluid d-lg-none d-block flex-column justify-content-center align-items-center" style={{backgroundColor:'#001F55', position:'absolute',left:'0',bottom:'0', top:'0'}}>
        <img src={sidebar_logo} alt="" className="img-fluid" />
        <p className="text-center fs-5 mt-4 text-white" style={{fontFamily:'Montserrat'}}>Sorry, you cannot view this application on this device. Please get a device with a larger screen size.</p>
      </div>

     {/* What shows in Large Screens */}
      <div className='main d-none d-lg-flex'>
        <SettingSideBar/>

        <div className="dashboard-content">
          {/* Navbar */}
          <NavBar pageTitle='Settings'/>
          
          {/* Profile container*/}
          <div className="profile-container py-4  bg-white" style={{marginTop:'6rem'}}>
            {/* <p className="fs-4 fw-normal ms-5 text-start" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>Your Profile</p> */}
            <div className=" d-flex align-items-center justify-content-evenly">
              <div className="flex-column ">
               <p className="fs-4 fw-normal ms-4 text-start" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>Your Profile</p>
                <img src={admin_image} alt="" className="setting-pic img-fluid" />
                <div className="admin-infos mt-3" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                  <p className="fw-semibold">ID Number: <br /> <span className='fw-normal'>0023985 </span> </p>
                </div>
              </div>

              <div className=" d-flex flex-column">
               {/* Settings input fields */}
                <div className="setting-field name-field text-start fw-semibold" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                  Full Name
                  <input type="text" className='setting-input' disabled placeholder='Tabe Lilian' />
                </div>

                <div className="setting-field name-field mt-3 text-start fw-semibold" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                  Email
                  <input type="text" className='setting-input' disabled placeholder='tabelilian@bueaprison.com' />
                </div>

                <div className="setting-field name-field mt-3 text-start fw-semibold" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                  Country
                  <input type="text" className='setting-input' disabled placeholder='Cameroon' />
                </div>

                <div className="setting-field name-field mt-3 text-start fw-semibold" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                  City
                  <input type="text" className='setting-input' disabled placeholder='Buea' />
                </div>

            </div>

            </div>

          </div>  

          

        </div>
      </div>

    </div>
  )
}

export default Settings