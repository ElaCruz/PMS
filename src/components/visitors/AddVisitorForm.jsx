import React, { useState , useEffect} from 'react'
import SearchBar from '../SearchBar'
import axios from 'axios';

function AddVisitorForm() {

    //    Logic to add new cell
   const [genders, setGenders] = useState([]);
    const [cells, setCells] = useState([]);
    const [prisoners, setPrisoners] = useState([]);

    useEffect(() => {
        // Fetch prisoners from Django backend
        axios
        .get('http://localhost:8000/api/prisoners/')
        .then((response) => {
            setPrisoners(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

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
        .get('http://localhost:8000/api/cells/')
        .then((response) => {
            setCells(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const [formData, setFormData] = useState({
      full_name: "",
      relation: "",
      gender: "",
      phone_number: "",
     date_visited: "",
     cell_visited: "",
      prisoner_visited: "",
     time_of_arrival: "",
     time_of_departure: ""
    });

    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("full_name", formData.full_name);
      data.append("relation", formData.relation);
      data.append("gender", formData.gender);
      data.append("phone_number", formData.phone_number);
      data.append("date_visited", formData.date_visited);
      data.append("cell_visited", formData.cell_visited);
      data.append("prisoner_visited", formData.prisoner_visited);
      data.append("time_of_arrival", formData.time_of_arrival);
      data.append("time_of_departure", formData.time_of_departure);
      

      try {

        // await axios.post("http://localhost:8000/api/prisoners/", {data});

        await axios.post("http://localhost:8000/api/visitors/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Reset form data
        setFormData({
          full_name: "",
          relation: "",
          gender: "",
          phone_number: "",
          date_visited: "",
          time_of_arrival: "",
          time_of_departure: "",
          cell_visited: "",
          prisoner_visited: "",
         
        });
        alert("Visitor added successfully!");
      } catch (error) {
        console.error(error);
        alert("Error adding visitor.");
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
          + Add New Visitor
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
                Visitor Data
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
                      Full Name
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    <div className="text-start field-width">
                      Relation
                      <input
                        type="text"
                        name="relation"
                        value={formData.relation}
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
                      Telephone
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    <div className="text-start field-width">
                      Cell Visited
                      {/* <input type="text"  id="cell_visited" value={selectedCell}  onChange={(e) => setSelectedCell(e.target.value)} className='sub-input px-2' /> */}
                      <select
                        name="cell_visited"
                        value={formData.cell_visited}
                        onChange={handleChange}
                        className="sub-input"
                      >
                        <option value="">Choose Cell</option>
                        {cells.map((cell) => (
                          <option key={cell.id} value={cell.id}>
                            {cell.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="text-start field-width">
                      Prisoner Visited
                      {/* <input type="text" id="name" value={selectedPrisoner}  onChange={(e) => setSelectedPrisoner(e.target.value)}  className='sub-input' /> */}
                      <select
                        name="prisoner_visited"
                        value={formData.prisoner_visited}
                        onChange={handleChange}
                        className="sub-input"
                      >
                        <option value="">Choose Prisoner</option>
                        {prisoners.map((prisoner) => (
                          <option key={prisoner.id} value={prisoner.id}>
                            {prisoner.first_name} {prisoner.last_name}
                          </option>
                        ))}
                        {/* <option value="cell_a">Cell_A</option>
                                            <option value="cell_b">Cell_B</option>
                                            <option value="cell_c">Cell_C</option>
                                            <option value="cell_d">Cell_D</option> */}
                      </select>
                    </div>
                  </div>

                  {/* Row form 3 */}
                  <div className="d-flex mt-4 justify-content-evenly">
                    <div className="text-start field-width">
                      Date Visited
                      <input
                        type="date"
                        name="date_visited"
                        value={formData.date_visited}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    <div className="text-start field-width">
                      Time Of Arrival
                      <input
                        type="time"
                        name="time_of_arrival"
                        value={formData.time_of_arrival}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>

                    <div className="text-start field-width">
                      Time Of Departure
                      <input
                        type="time"
                        name="time_of_departure"
                        value={formData.time_of_departure}
                        onChange={handleChange}
                        className="sub-input px-2"
                      />
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    class="btn save-btn text-white fw-semibold"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVisitorForm