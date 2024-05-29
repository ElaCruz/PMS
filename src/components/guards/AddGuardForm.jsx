import React, { useState , useEffect} from 'react'
import SearchBar from '../SearchBar'
import axios from "axios";

function AddGuardForm() {

     const [genders, setGenders] = useState([]);
    const [cells, setCells] = useState([]);
    // const [statuses, setStatuses] = useState([]);
    

    useEffect(() => {
        // Fetch prisoners from Django backend
        axios
        .get("http://localhost:8000/api/gender/")
        .then((response) => {
            setGenders(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }, []);

    useEffect(() => {
        // Fetch cells from Django backend
        axios
        .get("http://localhost:8000/api/cells/")
        .then((response) => {
            setCells(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }, []);

    // useEffect(() => {
    //   // Fetch cells from Django backend
    //   axios
    //     .get("http://localhost:8000/api/status/")
    //     .then((response) => {
    //       setStatuses(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }, []);


       const [formData, setFormData] = useState({
         first_name: "",
         last_name: "",
         gender: "",
         age: "",
         cell: "",
        //  status:"",
         photo: null,
         shift_start_time: "",
         shift_end_time: "",
       });

       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };
       
       
        const handleFileChange = (e) => {
            setFormData({ ...formData, photo: e.target.files[0] });
        };

       const handleSubmit = async (e) => {
         e.preventDefault();
         const data = new FormData();
         data.append("first_name", formData.first_name);
         data.append("last_name", formData.last_name);
         data.append("gender", formData.gender);
         data.append("cell", formData.cell);
        //  data.append("status", formData.status);
         data.append("photo", formData.photo);
         data.append("age", formData.age);
         data.append("shift_start_time", formData.shift_start_time);
         data.append("shift_end_time", formData.shift_end_time);

         try {
           await axios.post("http://localhost:8000/api/guards/", data, {
               headers: {
                 "Content-Type": "multipart/form-data",
               },
           });

           // Reset form data
           setFormData({
             first_name: "",
             last_name: "",
             gender: "",
             cell: "",
             photo: null,
             age: "",
            //  status: "",
             shift_start_time: "",
             shift_end_time: "",
           });
           alert("Guard added successfully!");
         } catch (error) {
           console.error(error);
           alert("Error adding guard.");
         }
       };
    




  return (
    <div>
      <div className="d-flex justify-content-between">
        {/* Search Guard */}
        <SearchBar />

        {/* Button trigger  add new guard  modal*/}
        <button
          type="button"
          class="add-any-btn text-white fw-semibold"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          + Add New Guard
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="staticBackdrop"
        style={{ fontFamily: "Montserrat", color: "#5a5a5a" }}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog prison-modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title  prisoner-modal-title fw-semibold text-center"
                id="staticBackdropLabel"
              >
                Guard Data
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="fields-cover mt-4 d-flex flex-column justify-content-center">
                  {/* Form row1 */}
                  <div className="d-flex justify-content-evenly">
                    <div className="text-start field-width">
                      First Name
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    <div className="text-start field-width">
                      Last Name
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    <div className="text-start field-width">
                      Gender
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="sub-input"
                        required
                      >
                        <option value="">Select Gender</option>
                        {genders.map((gender) => (
                          <option key={gender.id} value={gender.id}>
                            {gender.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Form row 2 */}
                  <div className="d-flex mt-4 justify-content-evenly">
                    <div className="text-start field-width">
                      Age
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    {/* <div className="text-start field-width">
                      Status
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="sub-input"
                      >
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </div> */}

                    <div className="text-start field-width">
                      Cell Assigned
                      <select
                        name="cell"
                        value={formData.cell}
                        onChange={handleChange}
                        className="sub-input"
                      >
                        <option value=""> Choose option </option>
                        {cells.map((cell) => (
                          <option key={cell.id} value={cell.id}>
                            {cell.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="text-start field-width">
                      Shift Start Time
                      <input
                        type="time"
                        name="shift_start_time"
                        value={formData.shift_start_time}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>
                  </div>

                  {/* Row form 3 */}
                  <div className="d-flex mt-4 gap-4">
                    {/* <div className="text-start field-width">
                      Shift Start Time
                      <input
                        type="time"
                        name="shift_start_time"
                        value={formData.shift_start_time}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div> */}

                    <div className="text-start field-width ms-5">
                      Shift End Time
                      <input
                        type="time"
                        name="shift_end_time"
                        value={formData.shift_end_time}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    <div className="text-start field-width">
                      Picture
                      <input
                        type="file"
                        name="photo"
                        // required
                        onChange={handleFileChange}
                        className="sub-input px-2"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  class="btn save-btn text-white fw-semibold"
                >
                  Save Record
                </button>
                
              </form>
            </div>

            <div class="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGuardForm