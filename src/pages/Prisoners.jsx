import React from 'react'
// import SideBar from '../component/Section'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import sidebar_logo from '../assets/sidebar_logo.svg'
import PrisonerSideBar from '../components/prisoners/PrisonerSideBar'
import AddPrisonerForm from '../components/prisoners/AddPrisonerForm'
import PrisonerTable from '../components/prisoners/PrisonerTable'

// Icons
import group_prisoner_icon from "../assets/group_prisoner_icon.svg";
import court_cases_icon from "../assets/court_cases_icon.svg"




function Prisoners() {

  // Getting the Prisoner Data Summary from the backend
  const [prisonerCount, setPrisonerCount] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/api/prisoners/").then((response) =>
        response.json()
      ),
    ])
      .then(
        ([
          prisonersResponse,
        ]) => {
          setPrisonerCount(prisonersResponse.length);
        }
      )
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
        <PrisonerSideBar />

        <div className="dashboard-content">
          {/* Navbar */}
          <NavBar pageTitle="Prisoners" />

          {/* Where the main things appear */}
          <div className="mainthings-section">
            <div className="main-container">
              {/* Prisoner Page Summary Section */}
              <div className=" prisoners-summary d-flex gap-4 justify-content-start align-items-center">
                {/* <div className="d-flex gap-5 justify-content-center"> */}
                  {/* Total Prisoners */}
                  {/* <div className="prisoners-div total py-2 px-4 d-flex flex-column "> */}
                    {/* <div className="icon-text-div d-flex gap-2 align-items-center">
                      <img
                        src={group_prisoner_icon}
                        alt="prisoner_group_icon"
                      />
                      <b>Total Prisoners</b>
                    </div> */}

                    {/* Total Prisoners Number */}
                    {/* <h4 className="text-start mt-2 fw-semibold">0{ prisonerCount}</h4> */}
                  {/* </div> */}

                  {/* Total Court Cases */}
                  {/* <div className="prisoners-div court-cases py-2 px-4 d-flex flex-column"> */}
                    {/* <div className="icon-text-div d-flex gap-2 align-items-center">
                      <img
                        src={court_cases_icon} className='court_group_icon'
                        alt="cases_group_icon"
                      />
                      <b>Total Court Cases</b>
                    </div> */}

                    {/* Total Court Cases Number */}
                    {/* <h4 className="text-start mt-2 fw-semibold">0{ prisonerCount}</h4> */}
                  {/* </div>
                </div> */}
                {/* End of Prisoner and COurt Case Divs */}

                {/* Graph Statistics Area Just Incase I decide to add*/}
                {/* <div className="prisoner-graph"></div> */}
              </div>

              {/* Searchbar, Add Btn , Form and Table Section */}
              <div className="searchbar-btn-div d-flex justify-content-between">
                <AddPrisonerForm />
                {/* Prisoner Table */}
                <div
                  className="position-absolute mt-5"
                  style={{ marginRight: "194rem", width: "80vw" }}
                >
                  <PrisonerTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prisoners