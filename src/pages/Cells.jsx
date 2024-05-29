import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar'
import sidebar_logo from '../assets/sidebar_logo.svg'
import CellSideBar from '../components/CellSideBar'
import AddCellForm from '../components/AddCellForm'
import cell_group_icon from "../assets/group_cell_icon.svg";
import cell_highest from "../assets/cell_highest.svg";



function Cells() {
  // Getting the Prisoner Data Summary from the backend
  const [cellCount, setCellCount] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/api/cells/").then((response) =>
        response.json()
      ),
    ])
      .then(([prisonersResponse]) => {
        setCellCount(prisonersResponse.length);
      })
      .catch((error) => console.error(error));
  }, []);

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
        <CellSideBar />
        <div className="dashboard-content">
          {/* Navbar */}
          <NavBar pageTitle="Cells" />

          {/* Where the main things appear */}
          <div className="mainthings-section">
            <div className="main-container">
              {/* Cell Summary Area */}
              <div className="prisoners-summary d-flex gap-4 justify-content-start align-items-center">
                <div className="prisoners-div total py-2 px-4 d-flex flex-column h-100">
                  <div className="icon-text-div d-flex gap-2 align-items-center">
                    <img src={cell_group_icon} alt="cell_group_icon" />
                    <b>Total Cells</b>
                  </div>

                  {/* Total Prisoners Number */}
                  <h4 className="text-start mt-2 fw-semibold">0{cellCount}</h4>
                </div>

                <div className="prisoners-div total py-2 px-4 d-flex flex-column h-100 ">
                  <div className="icon-text-div d-flex gap-2 align-items-center">
                    <img
                      src={cell_highest}
                      alt="cell_highest_icon"
                      style={{ width: "50px" }}
                    />
                    <b>Cell With Highest Capacity</b>
                  </div>

                  {/* Total Prisoners Number */}
                  <h4
                    className="text-start mt-2 fs-6 fw-normal"
                    style={{ color: "#5BC780" }}
                  >
                    Cell Name Here
                  </h4>
                </div>
              </div>
              {/* End of Cell Summary Area */}

              <div className="searchbar-btn-div d-flex  ">
                <AddCellForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cells