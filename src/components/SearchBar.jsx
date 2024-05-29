import React from 'react'
import admin_image from '../assets/admin_image.svg'
import search_normal from '../assets/search-normal.svg'


function SearchBar() {
  return (
    <div className='content-search px-3 shadow bg-white d-flex gap-3  align-items-center' style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
        <div className="d-flex gap-2 align-items-center">
            <img src={search_normal} alt="" className="content-search-icon" />
            <input type="text" placeholder='Search..' className="table-search-input border-0 outline-0 " />
        </div>

        <img src={admin_image} alt="" className="search-image " />
    </div>
  )
}

export default SearchBar
