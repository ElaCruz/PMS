import React from 'react'
import { useState, useEffect } from "react";
import SideBar from '../components/Section'
import NavBar from '../components/NavBar'
import LineChart from '../components/charts/LineChart'
import GenderChart from '../components/charts/GenderChart'
import sidebar_logo from '../assets/sidebar_logo.svg'

import CellPopulation from '../components/charts/CellPopulation'
// Imports for icons and graphs and static graphs
import group_visitor_icon from '../assets/group_visitor_icon.svg'
import group_prisoner_icon from '../assets/group_prisoner_icon.svg'
import group_cell_icon from '../assets/group_cell_icon.svg'
import group_guard_icon from '../assets/group_guard_icon.svg'
import visit_static_graph from '../assets/visit_static_graph.svg'



function Dashboard() {

  // Getting total of everything from the backend
   const [prisonerCount, setPrisonerCount] = useState(0);
   const [cellCount, setCellCount] = useState(0);
   const [visitorCount, setVisitorCount] = useState(0);
   const [guardCount, setGuardCount] = useState(0);

   useEffect(() => {
     Promise.all([
       fetch("http://localhost:8000/api/prisoners/").then((response) =>
         response.json()
       ),
       fetch("http://localhost:8000/api/cells/").then((response) =>
         response.json()
       ),
       fetch("http://localhost:8000/api/visitors/").then((response) =>
         response.json()
       ),
       fetch("http://localhost:8000/api/guards/").then((response) =>
         response.json()
       ),
     ])
       .then(
         ([
           prisonersResponse,
           cellsResponse,
           visitorsResponse,
           guardsResponse,
         ]) => {
           setPrisonerCount(prisonersResponse.length);
           setCellCount(cellsResponse.length);
           setVisitorCount(visitorsResponse.length);
           setGuardCount(guardsResponse.length);
         }
       )
       .catch((error) => console.error(error));
   }, []);
  
  
  return (
    <div>

      {/* What shows in smaller screens */}
      <div className="d-flex container-fluid d-lg-none d-block flex-column justify-content-center align-items-center" style={{backgroundColor:'#001F55', position:'absolute',left:'0',bottom:'0', top:'0'}}>
        <img src={sidebar_logo} alt="" className="img-fluid" />
        <p className="text-center fs-5 mt-4 text-white" style={{fontFamily:'Montserrat'}}>Sorry, you cannot view this application on this device. Please get a device with a larger screen size.</p>
      </div>


      {/* What shows in Large Screens */}
      <div className='main d-none d-lg-flex'>
        <SideBar/>
        <div className="dashboard-content">
          {/* Navbar */}
          <NavBar pageTitle='Dashboard'/>
         {/* Where the main things appear */}

          <div className="mainthings-section">
            <h4 className="welcome-text text-start me-3">Welcome Back, Lilian !</h4>
            <div className="main-container">
              {/* Small Div Boxes */}
              <div className="d-flex mt-4 gap-4">
                {/*Small Box 1 */}
                <div className=" small-box d-flex  ps-2 position-relative justify-content-start align-items-center bg-white ">
                  <img src={group_prisoner_icon} alt="" className="thing-icons img-fluid" />
                  <div className="d-flex flex-column text-start ms-2" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                    <p className='total-things'>Total Prisoners</p>
                    <h4 className='numberof-things fw-semibold position-absolute'>0{ prisonerCount}</h4>
                  </div>
                </div>

                {/*Small Box 2 */}
                 <div className=" small-box d-flex ps-2 position-relative justify-content-start align-items-center bg-white  shadow">
                  <img src={group_cell_icon} alt="" className="thing-icons img-fluid" />
                  <div className="d-flex flex-column text-start ms-2" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                    <p className='total-things'>Total Cells</p>
                    <h4 className='numberof-things fw-semibold position-absolute'>0{ cellCount}</h4>
                  </div>
                </div>

                {/*Small Box 3*/}
                 <div className=" small-box d-flex ps-2 position-relative justify-content-start align-items-center bg-white  shadow">
                  <img src={group_guard_icon} alt="" className="thing-icons img-fluid" />
                  <div className="d-flex flex-column text-start ms-2" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                    <p className='total-things'>Total Guards</p>
                    <h4 className='numberof-things fw-semibold position-absolute'>0{guardCount}</h4>
                  </div>
                </div>

               {/*Small Box 4 */}
                 <div className=" small-box d-flex ps-2 position-relative justify-content-start align-items-center bg-white  shadow">
                  <img src={group_visitor_icon} alt="" className="thing-icons img-fluid" />
                  <div className="d-flex flex-column text-start ms-2" style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
                    <p className='total-things'>Total Visitors</p>
                    <h4 className='numberof-things fw-semibold position-absolute'>0{visitorCount}</h4>
                  </div>
                </div>

              </div>

              {/* Graphs Section */}
              <div className="dashboard-graphs-container  d-flex gap-3 ">
                {/* Visitor's graph */}
                <div className="bg-white text-start fs-5 justify-content-start p-3 d-flex flex-column h-100" style={{width:'480px',borderRadius:'20px'}}>
                  Visitors Statistics
                  {/* <img src={visit_static_graph} alt="" className="img-fluid mt-5" /> */}
                  {/* <LineChart /> */}
                  <div style={{ width: '450px', height: '400px', margin: '9px auto' }}>
                    <LineChart />
                  </div>
                </div>

                {/* Gender Statistics graph */}
                <div className="bg-white fs-5  p-3 d-flex flex-column" style={{width:'380px', borderRadius:'20px',fontFamily:'Montserrat'}}>
                  Gender Population Statistics
                  <GenderChart/>
                </div>
              </div>

              {/* Last Section */}
              <div className="dashboard-last-section d-flex gap-3">
                <div className="bg-white text-start p-3 fs-5 d-flex flex-column "  style={{width:'380px', borderRadius:'20px'}}>
                  Cell Population
                  {/* Cell population graph here*/}
                  <CellPopulation/>
                </div>

                <div className=" bg-white text-start p-3 fs-5 d-flex flex-column "  style={{width:'480px', borderRadius:'20px'}}>
                  Recently Added Prisoners
                  {/* Recently added prisoners her*/}
                  
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

   </div>
  )
}

export default Dashboard