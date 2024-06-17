import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { exportToCSV, exportToPDF } from '../../utils/index';
import SearchBar from '../SearchBar';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PrisonerTable() {
  const [prisoners, setPrisoners] = useState([]);
  const [filteredPrisoners, setFilteredPrisoners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1");

  const [currentPrisoner, setCurrentPrisoner] = useState(null);
  const [genders, setGenders] = useState([]);
  const [cells, setCells] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Gender  fetch & UseEffect
  useEffect(() => {
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

  useEffect(() => {
    // Fetch status from Django backend
    axios
      .get("http://localhost:8000/api/status/")
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  const handleExportCSV = () => {
    exportToCSV(filteredPrisoners, "prisoners_csv");
  };

  const handleExportPDF = () => {
    exportToPDF(filteredPrisoners, "prisoners_pdf");
  };

  useEffect(() => {
    const fetchPrisoners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/prisoners/"
        );
        const prisonerData = response.data;
        setPrisoners(prisonerData);
        setFilteredPrisoners(prisonerData);
      } catch (error) {
        console.error("Error fetching prisoners:", error);
      }
    };

    fetchPrisoners();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = prisoners.filter(
      (prisoner) =>
        prisoner.first_name.toLowerCase().includes(lowerCaseQuery) ||
        prisoner.last_name.toLowerCase().includes(lowerCaseQuery) ||
        prisoner.cell_name.toLowerCase().includes(lowerCaseQuery) ||
        prisoner.gender_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPrisoners(filteredData);
  }, [searchQuery, prisoners]);

  const openModal = (prisoner) => {
    setSelectedPrisoner(prisoner);
  };

  const closeModal = () => {
    setSelectedPrisoner(null);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  //  Delete and Update Prisoner Details Handle
  const handleEditClick = (prisoner) => {
    setCurrentPrisoner(prisoner);
  };

  const handleDeleteClick = (prisoner) => {
    setCurrentPrisoner(prisoner);
  };

  const fetchPrisoners = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/prisoners/");
      const prisonerData = response.data;
      setPrisoners(prisonerData);
    } catch (error) {
      console.error("Error fetching prisoners:", error);
    }
  };

  const handleUpdate = (prisoner) => {
    const updatedPrisonerData = {
      /* Updated prisoner data from the modal inputs */
    };
    fetch(`http://localhost:8000/api/prisoners/${prisoner.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPrisonerData),
    }).then((response) => {
      if (response.ok) {
        // Handle successful update
        alert("Prisoner details updated successfully");
      }
    });
  };

  // Delete Prisoner Function
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/prisoners/${currentPrisoner.id}/`)
      .then((response) => {
        if (response.status === 200) {
          fetchPrisoners(setPrisoners); // Refresh the prisoner list
          alert("Failed To Delete Prisoner");
        } else {
          alert("Prisoner Deleted Succesfully");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Edit Prisoner Modal Detail
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPrisoner((prevPrisoner) => ({
      ...prevPrisoner,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between ">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="prisoner-table">
        <div className="export-group d-flex align-items-center gap-3 mt-5">
          <b>Export Data</b>
          <button
            className="export-btn d-flex justify-content-center align-items-center"
            onClick={handleExportCSV}
          >
            CSV
          </button>
          <button
            className="export-btn d-flex justify-content-center align-items-center"
            onClick={handleExportPDF}
          >
            PDF
          </button>
        </div>

        <table className="table table-striped table-hover">
          <thead className="w-100 pe-5">
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Cell</th>
              <th scope="col">Gender</th>
              <th scope="col">Date Arrested</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredPrisoners].reverse().map((prisoner) => (
              <tr key={prisoner.id} className=" align-items-center">
                <td>
                  <img
                    src={prisoner.photo}
                    alt="prisoner-photo"
                    className="prisoner-photo"
                  />
                </td>
                <td>
                  {prisoner.first_name} {prisoner.last_name}
                </td>
                <td>{prisoner.age}</td>
                <td>{prisoner.cell_name}</td>
                <td>{prisoner.gender_name}</td>
                <td>{prisoner.date_arrested}</td>
                <td className="table-icons d-flex gap-3 w-100 justify-content-center">
                  <img
                    src="/src/assets/scan.svg"
                    alt="details_icon"
                    data-bs-toggle="modal"
                    data-bs-target="#prisonerDetailsModal"
                    onClick={() => openModal(prisoner)}
                  />
                  <img
                    src="/src/assets/edit-2.svg"
                    alt="edit_icon"
                    data-bs-toggle="modal"
                    data-bs-target="#editPrisonerModal"
                    onClick={() => handleEditClick()}
                  />
                  <img
                    src="/src/assets/trash.svg"
                    alt="delete_icon"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePrisonerModal"
                    onClick={() => handleDeleteClick(prisoner)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Prisoner Details Modal */}
        <div
          className="modal fade"
          id="prisonerDetailsModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              {/* Modal Body / Content */}
              <div className="modal-body prisonerDetailsBody">
                {selectedPrisoner && (
                  <div className="prisonerDetailsContent d-flex gap-4">
                    <div className="prisoner-img-name">
                      <img
                        src={selectedPrisoner.photo}
                        alt="prisoner-photo"
                        className="prisoner-photo"
                      />
                      <p className="fs-5 fw-semibold mt-3">
                        {selectedPrisoner.first_name}{" "}
                        {selectedPrisoner.last_name}
                      </p>
                      <p className="mb-2 fs-6">
                        Cell Name: {selectedPrisoner.cell_name}
                      </p>
                    </div>

                    <div className="tabs-details">
                      <ul
                        className="nav nav-tabs d-flex gap-1 align-items-center"
                        role="tablist"
                      >
                        <li className="nav-item me-3" role="presentation">
                          <button
                            className={`nav-link ${
                              activeTab === "tab1" ? "active" : ""
                            } fs-6`}
                            id="tab1-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#tab1"
                            type="button"
                            role="tab"
                            aria-controls="tab1"
                            aria-selected={activeTab === "tab1"}
                            onClick={() => handleTabClick("tab1")}
                          >
                            Basic Data
                          </button>
                        </li>
                        <li className="nav-item ms-5" role="presentation">
                          <button
                            className={`nav-link ${
                              activeTab === "tab2" ? "active" : ""
                            } fs-6`}
                            id="tab2-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#tab2"
                            type="button"
                            role="tab"
                            aria-controls="tab2"
                            aria-selected={activeTab === "tab2"}
                            onClick={() => handleTabClick("tab2")}
                          >
                            Case Details
                          </button>
                        </li>
                      </ul>

                      <div className="tab-content mt-3">
                        <div
                          className={`tab-pane fade ${
                            activeTab === "tab1" ? "show active" : ""
                          }`}
                          id="tab1"
                          role="tabpanel"
                          aria-labelledby="tab1-tab"
                        >
                          <div className="tab-details-content">
                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Gender:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.gender_name}
                              </b>
                            </div>

                            <div className="d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Age:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.age}
                              </b>
                            </div>

                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Arrest Date:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.date_arrested}
                              </b>
                            </div>

                            <div className="d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Height:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.height}
                              </b>
                            </div>

                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Weight:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.weight}
                              </b>
                            </div>

                            <div className="d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Eye Color:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.eye_color}
                              </b>
                            </div>

                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Hair Color:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.hair_color}
                              </b>
                            </div>

                            <div className="d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Crime Committed:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.crime_committed}
                              </b>
                            </div>

                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Status:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.status_name}
                              </b>
                            </div>

                            <div className="d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Health Concerns:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.health_concerns}
                              </b>
                            </div>

                          </div>
                        </div>

                        <div
                          className={`tab-pane fade ${
                            activeTab === "tab2" ? "show active" : ""
                          }`}
                          id="tab2"
                          role="tabpanel"
                          aria-labelledby="tab2-tab"
                        >
                          <div className="tab-details-content">
                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Magistrate FN:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.magistrate_first_name}
                              </b>
                            </div>

                            {/* Detail row */}
                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Court:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.court}
                              </b>
                            </div>

                            {/* Detail row */}
                            <div className="d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">
                                Category of Offense:
                              </b>
                              <b className="fw-normal">
                                {selectedPrisoner.category_of_offense}
                              </b>
                            </div>

                            {/* Detail row */}
                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Case Start Date:</b>
                              <b className="fw-normal">
                                {selectedPrisoner.case_start_date}
                              </b>
                            </div>

                            {/* Detail row */}
                            <div className=" d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Case End Date: </b>
                              <b className="fw-normal">
                                {selectedPrisoner.case_end_date}
                              </b>
                            </div>

                            {/* Detail row */}
                            <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Sentence: </b>
                              <b className="fw-normal">
                                {selectedPrisoner.sentence}
                              </b>
                            </div>
                          </div>
                          {/* End ot tab details content */}
                        </div>
                        {/* End of Tab 2 Content */}
                      </div>
                      {/* End of Tab COntent */}
                    </div>
                  </div>
                )}
              </div>
              {/* End of Modal Body */}

              {/* Modal Footer */}
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>

        {/* End of Prisoner Details Modal */}

        {/* Edit Prisoner Modal */}
        {currentPrisoner && (
          <div
            class="modal fade"
            id="editPrisonerModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit Prisoner Details
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {/* Prisoner Details */}
                  <form>
                    {/* Add Talent Button Div*/}
                    {/* <div className="d-flex justify-content-end mt-2">
                      <button className="btn btn-dark"> + Add Talent</button>
                    </div> */}

                    {/* Edit form row */}
                    <div className="d-flex gap-4 my-2 justify-content-center">
                      {/* edit field */}
                      <div className="text-start edit-field">
                        First Name:
                        <input
                          type="text"
                          name="first_name"
                          value={currentPrisoner.first_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end of field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Last Name:
                        <input
                          type="text"
                          name="last_name"
                          value={currentPrisoner.last_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end edit of field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Gender
                        <select
                          name="gender"
                          value={currentPrisoner.gender_name}
                          onChange={handleInputChange}
                        >
                          <option value={currentPrisoner.gender_name}>
                            {currentPrisoner.gender_name}
                          </option>
                          {genders.map((gender) => (
                            <option key={gender.id} value={gender.id}>
                              {gender.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* End of edit field */}
                    </div>
                    {/* End of form row */}

                    {/* Edit Form Row */}
                    <div className="d-flex gap-4 my-2 justify-content-center">
                      {/* edit field */}
                      <div className="text-start edit-field">
                        Age:
                        <input
                          type="number"
                          name="age"
                          value={currentPrisoner.age}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end of edit field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Height:
                        <input
                          type="text"
                          name="height"
                          value={currentPrisoner.height}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end of edit field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Weight:
                        <input
                          type="text"
                          name="weight"
                          value={currentPrisoner.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end of edit field */}
                    </div>
                    {/* End of Edit Form Row */}

                    {/* Edit Form Row */}
                    <div className="d-flex gap-4 my-2 justify-content-center">
                      {/* edit field */}
                      <div className="text-start edit-field">
                        Eye Color:
                        <input
                          type="text"
                          name="eye_color"
                          value={currentPrisoner.eye_color}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end of edit field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Hair Color:
                        <input
                          type="text"
                          name="hair_color"
                          value={currentPrisoner.hair_color}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end of edit field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Crime Committed
                        <input
                          type="text"
                          name="weight"
                          value={currentPrisoner.crime_committed}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end of edit field */}
                    </div>
                    {/* End of Edit Form Row */}

                    {/* Edit form row */}
                    <div className="d-flex gap-4 my-2 justify-content-center">
                      {/* edit field */}
                      <div className="text-start edit-field">
                        Cell
                        <select
                          name="cell"
                          value={currentPrisoner.cell_name}
                          onChange={handleInputChange}
                        >
                          <option value={currentPrisoner.cell_name}>
                            {currentPrisoner.cell_name}
                          </option>
                          {cells.map((cell) => (
                            <option key={cell.id} value={cell.id}>
                              {cell.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* End of edit field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Date Arrested:
                        <input
                          type="date"
                          name="date_arrested"
                          value={currentPrisoner.date_arrested}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end edit of field */}

                      {/* edit field */}
                      <div className="text-start edit-field">
                        Status:
                        <select
                          name="status"
                          value={currentPrisoner.status}
                          onChange={handleInputChange}
                        >
                          <option value={currentPrisoner.status}>
                            {currentPrisoner.status_name}
                          </option>
                          {statuses.map((status) => (
                            <option key={status.id} value={status.id}>
                              {status.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* End of edit field */}
                    </div>
                    {/* End of form row */}

                    {/* Edit form row */}
                    <div className="d-flex gap-4 my-2 justify-content-center">
                      {/* edit field */}
                      <div className="text-start edit-field">
                        Health Concerns:
                        <input
                          type="text"
                          name="health_concerns"
                          value={currentPrisoner.health_concerns}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* end edit of field */}

                      {/* edit field */}
                      {/* <div className="text-start edit-field">
                      Picture:
                      <input
                        type="file"
                        name="photo"
                        value={currentPrisoner.photo}
                        onChange={handleInputChange}
                      />
                    </div> */}
                      {/* end edit of field */}
                    </div>
                    {/* End of form row */}
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    class="btn btn-primary"
                    onClick={() => handleUpdate(currentPrisoner)}
                    // onClick={handleUpdate}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End of Edit  Prisoner Modal */}

        {/* Delete Prisoner alert modal */}
        {currentPrisoner && (
          <div
            class="modal fade"
            id="deletePrisonerModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-center" id="exampleModalLabel">
                    Delete Prisoner
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M90.6663 66.3333L63.9997 18.3333C60.4163 11.875 55.458 8.33334 49.9997 8.33334C44.5413 8.33334 39.583 11.875 35.9997 18.3333L9.333 66.3333C5.958 72.4583 5.583 78.3333 8.29133 82.9583C10.9997 87.5833 16.333 90.125 23.333 90.125H76.6663C83.6663 90.125 88.9997 87.5833 91.708 82.9583C94.4163 78.3333 94.0413 72.4167 90.6663 66.3333Z"
                      fill="#F18E8E"
                    />
                    <path
                      d="M50 61.4583C48.2917 61.4583 46.875 60.0417 46.875 58.3333V37.5C46.875 35.7917 48.2917 34.375 50 34.375C51.7083 34.375 53.125 35.7917 53.125 37.5V58.3333C53.125 60.0417 51.7083 61.4583 50 61.4583Z"
                      fill="#F18E8E"
                    />
                    <path
                      d="M50.0007 75C49.7507 75 49.459 74.9583 49.1673 74.9167C48.9173 74.875 48.6673 74.7917 48.4173 74.6667C48.1673 74.5833 47.9173 74.4583 47.6673 74.2917C47.459 74.125 47.2507 73.9583 47.0423 73.7917C46.2923 73 45.834 71.9167 45.834 70.8333C45.834 69.75 46.2923 68.6667 47.0423 67.875C47.2507 67.7083 47.459 67.5417 47.6673 67.375C47.9173 67.2083 48.1673 67.0833 48.4173 67C48.6673 66.875 48.9173 66.7917 49.1673 66.75C49.709 66.625 50.2923 66.625 50.7923 66.75C51.084 66.7917 51.334 66.875 51.584 67C51.834 67.0833 52.084 67.2083 52.334 67.375C52.5423 67.5417 52.7507 67.7083 52.959 67.875C53.709 68.6667 54.1673 69.75 54.1673 70.8333C54.1673 71.9167 53.709 73 52.959 73.7917C52.7507 73.9583 52.5423 74.125 52.334 74.2917C52.084 74.4583 51.834 74.5833 51.584 74.6667C51.334 74.7917 51.084 74.875 50.7923 74.9167C50.5423 74.9583 50.2507 75 50.0007 75Z"
                      fill="#F18E8E"
                    />
                  </svg>
                  <p className="text-center fs-5">
                    Are you sure you want to delete this prisoner?
                  </p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    class="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End of Delete modal */}
      </div>
    </>
  );
}

export default PrisonerTable