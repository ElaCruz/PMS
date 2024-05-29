import React from 'react'
import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import { useAsyncError } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PrisonerTable() {
  const [prisoners, setPrisoners] = useState([]);
  const [genders, setGenders] = useState([]);


  useEffect(() => {
    const fetchPrisoners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/prisoners/"
        );
        const prisonerData = response.data;
        setPrisoners(prisonerData);
      } catch (error) {
        console.error("Error fetching prisoners:", error);
      }
    };

    fetchPrisoners();
  }, []);


  // Wahala fix


  // To get CellNames from the backend
  // const getCellNames = async (cellIds) => {

  //   try {
  //      const cellIds = [1,2,3];
  //     const cellPromises = cellIds.map(async (cellId) => {
  //       const response = await axios.get(
  //         `http://localhost:8000/api/cells/${cellId}/`
  //       );
  //       const cellData = response.data;
  //       return cellData.name;
  //     });

  //     return Promise.all(cellPromises);
  //   } catch (error) {
  //     console.error("Error fetching cell names:", error);
  //     return [];
  //   }
  // };

  // Trying Again

  // Call debouncedGetCellNames with cellIds whenever needed to fetch cell names

  // To get Gender Names from the backend
  // const getGenderNames = async (genderIds) => {
  //   try {
  //     const genderPromises = genderIds.map(async (genderId) => {
  //       const response = await axios.get(
  //         `http://localhost:8000/api/gender/${genderId}/`
  //       );
  //       const genderData = response.data;
  //       return genderData.name;
  //     });

  //     return Promise.all(genderPromises);
  //   } catch (error) {
  //     console.error("Error fetching gender names:", error);
  //     return [];
  //   }
  // };

  // For the cell UseEffect
  useEffect(() => {
    const fetchCellNames = async () => {
      const cellIds = prisoners.map((prisoner) => prisoner.cell);
      const cellNames = await getCellNames(cellIds);

      const prisonersWithCellNames = prisoners.map((prisoner, index) => {
        return {
          ...prisoner,
          cellName: cellNames[index],
        };
      });

      setPrisoners(prisonersWithCellNames);
    };

    fetchCellNames();
  }, [prisoners]);

  // Prisoner Details Modal
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);

  const openModal = (prisoner) => {
    setSelectedPrisoner(prisoner);
  };

  const closeModal = () => {
    setSelectedPrisoner(null);
  };

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="prisoner-table">
      <div className="export-group d-flex align-items-center gap-3 mt-5">
        <b>Export Data</b>
        <button className="export-btn d-flex justify-content-center align-items-center">
          CSV
        </button>
        <button className="export-btn d-flex justify-content-center align-items-center">
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
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {[...prisoners].reverse().map((prisoner) => (
            <tr key={prisoner.id} className=" align-items-center">
              {/* <td>{prisoner.photo} </td> */}
              <td>
                {" "}
                <img
                  src={prisoner.photo}
                  alt="prisoner-photo"
                  className="prisoner-photo"
                />{" "}
              </td>
              <td>
                {prisoner.first_name} {prisoner.last_name}
              </td>
              <td>{prisoner.age}</td>
              <td>{prisoner.cell}</td>
              <td>{prisoner.gender}</td>
              <td>{prisoner.date_arrested}</td>
              <td className="table-icons d-flex gap-3 w-100 justify-content-center">
                <img
                  src="/src/assets/scan.svg"
                  alt="details_icon"
                  data-bs-toggle="modal"
                  data-bs-target="#prisonerDetailsModal"
                  onClick={() => openModal(prisoner)}
                />
                <img src="/src/assets/edit-2.svg" alt="edit_icon" />
                <img src="/src/assets/trash.svg" alt="delete_icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Prisoner Modal */}
      <div
        class="modal fade  "
        id="prisonerDetailsModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body / Content */}
            <div class="modal-body   prisonerDetailsBody">
              {selectedPrisoner && (
                <div className="prisonerDetailsContent d-flex gap-4">
                  <div className="prisoner-img-name">
                    <img
                      src={selectedPrisoner.photo}
                      alt="prisoner-photo"
                      className="prisoner-photo"
                    />
                    <p className="fs-5 fw-semibold mt-3">
                      {selectedPrisoner.first_name} {selectedPrisoner.last_name}
                    </p>
                    <p className="mb-2 fs-6">
                      Cell Name: {selectedPrisoner.cell}
                    </p>
                    {/* Add more prisoner details here */}
                  </div>

                  {/* Details Tabs Section */}
                  <div className="tabs-details ">
                    {/* Tabs Label*/}
                    <ul
                      class="nav nav-tabs d-flex gap-1 align-items-center"
                      role="tablist"
                    >
                      <li class="nav-item me-3" role="presentation">
                        <button
                          class={`nav-link ${
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
                      <li class="nav-item ms-5" role="presentation">
                        <button
                          class={`nav-link ${
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

                    {/* Tab Content */}
                    <div class="tab-content mt-3">
                      {/* Tab 1 Content */}
                      <div
                        className={`tab-pane fade ${
                          activeTab === "tab1" ? "show active" : ""
                        }`}
                        id="tab1"
                        role="tabpanel"
                        aria-labelledby="tab1-tab"
                      >
                        <div className="tab-details-content ">
                          {/* Detail row */}
                          <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Gender:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.gender}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className="d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Age:</b>
                            <b className="fw-normal">{selectedPrisoner.age}</b>
                          </div>

                          {/* Detail row */}
                          <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Arrest Date:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.date_arrested}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className=" d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Height:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.height}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Weight:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.weight}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className="d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Eye Color:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.eye_color}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className=" tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Hair Color:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.hair_color}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className="d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Crime Committed:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.crime_committed}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className=" tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Status:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.status}
                            </b>
                          </div>
                        </div>
                        {/* End of Tab Details Content */}
                      </div>
                      {/* End of Tab 1 Content */}

                      {/* Tab 2 Content */}
                      <div
                        class={`tab-pane fade ${
                          activeTab === "tab2" ? "show active" : ""
                        }`}
                        id="tab2"
                        role="tabpanel"
                        aria-labelledby="tab2-tab"
                      >
                        <div className="tab-details-content">
                          {/* Detail row */}
                          <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Magistrate FN:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.magistrate_first_name}
                            </b>
                          </div>

                          {/* Detail row */}
                          <div className="d-flex justify-content-between w-100 py-1 px-3">
                            <b className="fw-semibold">Magistrate LN:</b>
                            <b className="fw-normal">
                              {selectedPrisoner.magistrate_last_name}
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
                            <b className="fw-semibold">Category of Offense:</b>
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
    </div>
  );
}

export default PrisonerTable