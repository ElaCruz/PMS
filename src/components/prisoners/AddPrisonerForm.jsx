import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SearchBar from '../SearchBar';



function AddPrisonerForm() {

    // Stuff going on in the backend
    // Searching gender, cell and  category_of_offense endpoints
    const [cells, setCells] = useState([]);
    const [genders, setGenders] = useState([]);
    const [offenses, setOffenses] = useState([]);
    const [statuses, setStatuses] = useState([]);

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
    
     useEffect(() => {
       // Fetch cells from Django backend
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
         .get("http://localhost:8000/api/offense/")
         .then((response) => {
           setOffenses(response.data);
         })
         .catch((error) => {
           console.error("Error:", error);
         });
     }, []);
    
     useEffect(() => {
       // Fetch cells from Django backend
       axios
         .get("http://localhost:8000/api/status/")
         .then((response) => {
           setStatuses(response.data);
         })
         .catch((error) => {
           console.error("Error:", error);
         });
     }, []);

    
    // Form Data
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      photo: null,
      age: "",
      height: "",
      weight: "",
      hair_color: "",
      eye_color: "",
      cell: "",
      gender: "",
      status: "",
      crime_committed: "",
      category_of_offense: "",
      health_concerns: "",
      date_arrested: "",
      magistrate_first_name: "",
      magistrate_last_name: "",
      case_start_date: "",
      case_end_date: "",
      court: "",
      sentence: "",
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
      data.append("photo", formData.photo);
      data.append("age", formData.age);
      data.append("height", formData.height);
      data.append("weight", formData.weight);
      data.append("hair_color", formData.hair_color);
      data.append("eye_color", formData.eye_color);
      data.append("cell", formData.cell);
      data.append("gender", formData.gender);
      data.append("status", formData.status);
      data.append("crime_committed", formData.crime_committed);
      data.append("category_of_offense", formData.category_of_offense);
      data.append("health_concerns", formData.health_concerns);
      data.append("date_arrested", formData.date_arrested);
      data.append("magistrate_first_name", formData.magistrate_first_name);
      data.append("magistrate_last_name", formData.magistrate_last_name);
      data.append("case_start_date", formData.case_start_date);
      data.append("case_end_date", formData.case_end_date);
      data.append("court", formData.court);
      data.append("sentence", formData.sentence);


        try {

          // await axios({
          //   method: "post",
          //   url: "http://localhost:8000/api/prisoners/",
          //   data: data,
          // }).then((response) => {
          //   console.log(response.data);
          // });

            // await axios.post("http://localhost:8000/api/prisoners/", {data});
          
          await axios.post("http://localhost:8000/api/prisoners/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
           });
                
        // Reset form data
        setFormData({
          first_name: "",
          last_name: "",
          photo: null,
          age: "",
          height: "",
          weight: "",
          hair_color: "",
          eye_color: "",
          cell: "",
          gender: "",
          status: "",
          crime_committed: "",
          category_of_offense: "",
          health_concerns: "",
          date_arrested: "",
          magistrate_first_name: "",
          magistrate_last_name: "",
          case_start_date: "",
          case_end_date: "",
          court: "",
          sentence: "",
        });
        alert("Prisoner added successfully!");
      } catch (error) {
        console.error(error);
        alert("Error adding prisoner.");
      }
    };

     




  return (
    <div>
      <div className="d-flex justify-content-between">
        {/* Search prisoner */}
        <SearchBar />

        {/* Button trigger  add new prisoner  modal*/}
        <button
          type="button"
          className="btn fw-semibold btn-primary add-any-btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          + Add New Prisoner
        </button>
      </div>

      {/* Modal  */}
      <div
        className="modal fade "
        style={{ color: "#5a5a5a", fontFamily: "Montserrat" }}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable prison-modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title prisoner-modal-title fw-semibold text-center "
                id="staticBackdropLabel"
              >
                Prisoner Data
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form
                onSubmit={handleSubmit}
                // method="post"
                // enctype="multipart/form-data"
              >
                <ul
                  class="nav nav-tabs d-flex justify-content-evenly "
                  role="tablist"
                >
                  <li class="nav-item me-5" role="presentation">
                    <button
                      class="nav-link active fs-6"
                      id="tab1-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tab1"
                      type="button"
                      role="tab"
                      aria-controls="tab1"
                      aria-selected="true"
                    >
                      Basic Data
                    </button>
                  </li>
                  <li class="nav-item ms-5" role="presentation">
                    <button
                      class="nav-link  fs-6"
                      id="tab2-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tab2"
                      type="button"
                      role="tab"
                      aria-controls="tab2"
                      aria-selected="false"
                    >
                      Case Details
                    </button>
                  </li>
                </ul>

                <div class="tab-content mt-3">
                  <div
                    class="tab-pane fade show active"
                    id="tab1"
                    role="tabpanel"
                    aria-labelledby="tab1-tab"
                  >
                    {/* <h5>Tab 1 Content</h5> */}
                    {/* <!-- form fields for tab1, basic data --> */}
                    <div className="fields-cover  mt-4 d-flex flex-column justify-content-center">
                      {/*Form Row 1 */}
                      <div className="d-flex justify-content-evenly">
                        <div className="text-start field-width">
                          First Name
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="sub-input px-2"
                          />
                        </div>

                        <div className="text-start field-width">
                          Last Name
                          <input
                            className="sub-input px-2"
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
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
                            <option value="">Choose Option</option>
                            {genders.map((gender) => (
                              <option key={gender.id} value={gender.id}>
                                {gender.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/*Form Row 2 */}
                      <div className="d-flex justify-content-evenly mt-4 ">
                        <div className="text-start  field-width">
                          Age
                          <input
                            type="number"
                            name="age"
                            className="sub-input px-2"
                            value={formData.age}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="text-start field-width">
                          Height
                          <input
                            type="text"
                            value={formData.height}
                            name="height"
                            onChange={handleChange}
                            placeholder="(cm)"
                            className="sub-input px-2"
                          />
                        </div>

                        <div className="text-start field-width">
                          Weight
                          <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="(kg)"
                            className="sub-input px-2"
                          />
                        </div>
                      </div>

                      {/*Form Row 3 */}
                      <div className="d-flex justify-content-evenly mt-4 ">
                        <div className="text-start  field-width">
                          Eye Color
                          <input
                            type="text"
                            name="eye_color"
                            value={formData.eye_color}
                            onChange={handleChange}
                            className="sub-input px-2"
                          />
                        </div>

                        <div className="text-start field-width">
                          Hair Color
                          <input
                            type="text"
                            name="hair_color"
                            value={formData.hair_color}
                            onChange={handleChange}
                            placeholder=""
                            className="sub-input px-2"
                          />
                        </div>

                        <div className="text-start field-width">
                          Crime Committed
                          <input
                            type="text"
                            name="crime_committed"
                            value={formData.crime_committed}
                            onChange={handleChange}
                            placeholder=""
                            className="sub-input px-2"
                          />
                        </div>
                      </div>

                      {/*Form Row 4 */}
                      <div className="d-flex justify-content-evenly mt-4 ">
                        <div className="text-start  field-width">
                          Status
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="sub-input"
                          >
                            <option value="">Choose Option</option>
                            {statuses.map((status) => (
                              <option key={status.id} value={status.id}>
                                {status.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="text-start field-width">
                          Date Arrested
                          <input
                            type="date"
                            name="date_arrested"
                            value={formData.date_arrested}
                            onChange={handleChange}
                            placeholder=""
                            className="sub-input px-2"
                          />
                        </div>

                        <div className="text-start field-width">
                          Cell
                          <select
                            name="cell"
                            value={formData.cell}
                            onChange={handleChange}
                            className="sub-input"
                            required
                          >
                            <option value="">Choose Option</option>
                            {cells.map((cell) => (
                              <option key={cell.id} value={cell.id}>
                                {cell.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/*Form Row 5 */}
                      <div className="d-flex gap-5  mt-4 ">
                        <div className="text-start mx-4 field-width">
                          Health Concerns (Optional)
                          <input
                            type="text"
                            name="health_concerns"
                            value={formData.health_concerns}
                            onChange={handleChange}
                            className="sub-input px-2"
                          />
                        </div>

                        <div className="text-start field-width">
                          Picture
                          <input
                            type="file"
                            name="photo"
                            required
                            onChange={handleFileChange}
                            // placeholder=""
                            className="sub-input px-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="tab2"
                    role="tabpanel"
                    aria-labelledby="tab2-tab"
                  >
                    {/* <h5>Tab 2 Content</h5> */}
                    {/* <!-- Add your content for Tab 2 here --> */}

                    {/*Form Row 1 */}
                    <div className="d-flex justify-content-evenly">
                      <div className="text-start field-width">
                        Lawyer's FN
                        <input
                          type="text"
                          name="magistrate_first_name"
                          value={formData.magistrate_first_name}
                          onChange={handleChange}
                          className="sub-input px-2"
                        />
                      </div>

                      <div className="text-start field-width">
                        Lawyer's LN
                        <input
                          type="text"
                          name="magistrate_last_name"
                          value={formData.magistrate_last_name}
                          onChange={handleChange}
                          className="sub-input px-2"
                        />
                      </div>

                      <div className="text-start field-width">
                        Court
                        <input
                          type="text"
                          name="court"
                          value={formData.court}
                          onChange={handleChange}
                          className="sub-input px-2"
                        />
                      </div>
                    </div>

                    {/*Form Row 2v*/}
                    <div className="d-flex justify-content-evenly mt-4">
                      {/* <div className="text-start field-width">
                            Crime Committed
                            <input type="text" name='crime_committed' value={formData.crime_committed} onChange={handleInputChange} className="sub-input px-2" />
                        </div> */}

                      <div className="text-start field-width">
                        Category of Offense
                        <select
                          name="category_of_offense"
                          value={formData.category_of_offense}
                          onChange={handleChange}
                          className="sub-input"
                        >
                          <option value="">Choose Option</option>
                          {offenses.map((offense) => (
                            <option key={offense.id} value={offense.id}>
                              {offense.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-start field-width">
                        Case Start Date
                        <input
                          type="date"
                          name="case_start_date"
                          value={formData.case_start_date}
                          onChange={handleChange}
                          className="sub-input px-2"
                        />
                      </div>

                      <div className="text-start field-width ms-2">
                        Case End Date
                        <input
                          type="date"
                          name="case_end_date"
                          value={formData.case_end_date}
                          onChange={handleChange}
                          className="sub-input px-2"
                        />
                      </div>
                    </div>

                    {/*Form Row 3*/}
                    <div className="d-flex mt-4">
                      {/* <div className="text-start field-width ms-5">
                                Case End Date
                                <input type="date" name='case_end_date' value={formData.case_end_date} onChange={handleInputChange} className="sub-input px-2" />
                            </div> */}

                      <div className="text-start field-width ms-5">
                        Sentence
                        <input
                          type="text"
                          name="sentence"
                          value={formData.sentence}
                          onChange={handleChange}
                          className="sub-input px-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="save-btn btn fw-semibold text-white "
                >
                  Save Record
                </button>
              </form>
            </div>

            {/* </div> */}

            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              {/* <button type="submit" data-bs-dismiss="modal" className="save-btn btn fw-semibold text-white ">Save Record</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPrisonerForm