import React from 'react'
import { NavLink } from 'react-router-dom'
import NavBar from '../components/NavBar'
import sidebar_logo from '../assets/sidebar_logo.svg'
import GuardSideBar from '../components/guards/GuardSideBar'
import AddGuardForm from '../components/guards/AddGuardForm'
import GuardTable from '../components/guards/GuardTable'





function PrisonGuards() {
  return (
    <div>
      {/* What shows in smaller screens */}
      <div
        className="d-flex container-fluid d-lg-none d-block flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "#001F55",
          position: "absolute",
          left: "0",
          bottom: "0",
          top: "0",
        }}
      >
        <img src={sidebar_logo} alt="" className="img-fluid" />
        <p
          className="text-center fs-5 mt-4 text-white"
          style={{ fontFamily: "Montserrat" }}
        >
          Sorry, you cannot view this application on this device. Please get a
          device with a larger screen size.
        </p>
      </div>

      {/* What shows in Large Screens */}
      <div className="main d-none d-lg-flex">
        <GuardSideBar />
        <div className="dashboard-content">
          {/* Navbar */}
          <NavBar pageTitle="Guards" />

          {/* Where the main things appear */}
          <div className="mainthings-section">
            <div className="main-container">
              <div className="searchbar-btn-div d-flex justify-content-between">

                <AddGuardForm />

                {/* GuardTable */}
                <div
                  className="position-absolute mt-5"
                  style={{ marginRight: "194rem", width: "80vw" }}
                >
                  <GuardTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrisonGuards