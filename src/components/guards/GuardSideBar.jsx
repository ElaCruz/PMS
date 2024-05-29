import React from 'react'
import { NavLink } from 'react-router-dom'
import sidebar_logo from '../../assets/sidebar_logo.svg'

// SideBar Icons
import dashboard from '../../assets/dashboard.svg'
import prisoners from '../../assets/people.svg'
import cells from '../../assets/cells.svg'
import visitors from '../../assets/visitors.svg'
import guards_active from '../../assets/guards_active.svg'
import setting from '../../assets/setting.svg'
import logout from '../../assets/logout.svg'

function GuardSideBar() {
  return (
    <div className='sidebar'>
      <div className="inner-content justify-content-center mt-4 mx-2">
        {/* Logo */}
        <div className="logo-container">
           <img src={sidebar_logo} alt="" className="img-fluid " />
        </div>

        {/* SideBar Links */}
        <div className="links-container mx-3 mt-5">
          {/* InActive Link */}
          <div className="inactive-link-cover d-flex align-items-center gap-2 px-3" activeClassName="active-link" >
            <NavLink exact to="/dashboard" className=" inactive-link fw-normal fs-6"  style={{fontFamily:'Montserrat'}}>
              <img src={dashboard} alt="" className='img-fluid mx-3' />
              Dashboard
            </NavLink>
          </div>

          {/* Other Links */}
          <div className="inactive-links">
            
            <div className="inactive-link-cover d-flex align-items-center mt-1 gap-2 px-3 mt-2" >
              <NavLink exact to="/prisoners" className=" fw-normal inactive-link fs-6 "  style={{fontFamily:'Montserrat'}}>
                <img src={prisoners} alt="" className='img-fluid mx-3' />
                Prisoners
              </NavLink>
            </div>

            <div className="inactive-link-cover d-flex align-items-center mt-1 gap-2 px-3" >
              <NavLink exact to="/cells" className="inactive-link fw-normal  fs-6"  style={{fontFamily:'Montserrat'}}>
                <img src={cells} alt="" className='img-fluid mx-3' />
                Cells
              </NavLink>
            </div>

             {/* Active Link */}
            <div className="active-link-cover d-flex align-items-center mt-1 gap-2 ps-3 " >
              <NavLink exact to="/guards" className="active-link text-white fw-semibold  fs-6"  style={{fontFamily:'Montserrat'}}>
                <img src={guards_active} alt="" className='img-fluid mx-3' />
                 Guards
              </NavLink>
            </div>

            <div className="inactive-link-cover d-flex align-items-center mt-1 gap-2 px-3" >
              <NavLink exact to="/visitors" className="inactive-link fw-normal  fs-6"  style={{fontFamily:'Montserrat'}}>
                <img src={visitors} alt="" className='img-fluid mx-3' />
                Visitors
              </NavLink>
            </div>

            <div className="inactive-link-cover d-flex align-items-center mt-1 gap-2 px-3" >
              <NavLink exact to="/setting" className="inactive-link fw-normal  fs-6"  style={{fontFamily:'Montserrat'}}>
                <img src={setting} alt="" className='img-fluid mx-3' />
                Settings
              </NavLink>
            </div>

            {/* Logout */}
            <div className="logout-link-cover d-flex align-items-center mt-5 pt-5 gap-2 px-3" >
              <NavLink exact to="/" className="inactive-logout fw-normal  fs-6"  style={{fontFamily:'Montserrat'}}>
                <img src={logout} alt="" className='img-fluid mx-3' />
                Log Out
              </NavLink>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default GuardSideBar