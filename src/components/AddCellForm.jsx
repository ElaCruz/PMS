import React from 'react'
import { useState,useEffect } from 'react'
import SearchBar from './SearchBar'
import axios from 'axios';


function AddCellForm() {

//    Logic to add new cell
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send an HTTP POST request to the Django backend
      await axios.post('http://localhost:8000/api/cells/', { name });

      // Clear the form input
      setName('');

      // Display a success message or perform any other desired action
      console.log('Cell added successfully');
    } catch (error) {
      // Handle errors
      console.error('Error adding cell:', error);
    }
  };


  return (
    <div className='add-cell-form' style={{fontFamily:'Montserrat', color:'#5a5a5a'}}>
        
        {/* Add new cell modal aan searchbar*/}
       <div className="d-flex justify-content-between align-items-center">
            <SearchBar />
            <button type="button" class="add-any-btn text-white fw-semibold " data-bs-toggle="modal" data-bs-target="#exampleModal" >
               + Add Prison Cell
           </button>
       </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header ps-3">
                    <h5 class="modal-title fw-semibold mx-auto ps-5" id="exampleModalLabel"> Add Cell Data</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {/* <!-- Modal content goes here --> */}
                    
                    <form onSubmit={handleSubmit} >
                        <div className=" align-items-start d-flex flex-column justify-content-start">
                            Cell Name
                            <input type="text"  id="name" value={name}  onChange={(e) => setName(e.target.value)}  className="add-cell-input ps-3" />
                        </div>

                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                            <button type="submit" data-bs-dismiss="modal" class="btn save-btn text-white fw-semibold">Add Cell</button>
                        </div>
                    </form>

                </div>
      
            </div>
        </div>
        </div>

    </div>
  )
}

export default AddCellForm