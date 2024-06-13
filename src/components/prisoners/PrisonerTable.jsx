import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { exportToCSV, exportToPDF } from '../../utils/index';
import SearchBar from '../SearchBar';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PrisonerTable() {
  const [prisoners, setPrisoners] = useState([]);
  const [filteredPrisoners, setFilteredPrisoners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleExportCSV = () => {
    exportToCSV(filteredPrisoners, 'prisoners_csv');
  };

  const handleExportPDF = () => {
    exportToPDF(filteredPrisoners, 'prisoners_pdf');
  };

  useEffect(() => {
    const fetchPrisoners = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/prisoners/");
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
    const filteredData = prisoners.filter((prisoner) =>
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

  return (
    <> 
      <div className="d-flex justify-content-between">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="prisoner-table">
        <div className="export-group d-flex align-items-center gap-3 mt-5">
          <b>Export Data</b>
          <button className="export-btn d-flex justify-content-center align-items-center" onClick={handleExportCSV}>
            CSV
          </button>
          <button className="export-btn d-flex justify-content-center align-items-center" onClick={handleExportPDF}>
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
                  <img src="/src/assets/edit-2.svg" alt="edit_icon" />
                  <img src="/src/assets/trash.svg" alt="delete_icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Prisoner Modal */}
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
                        {selectedPrisoner.first_name} {selectedPrisoner.last_name}
                      </p>
                      <p className="mb-2 fs-6">
                        Cell Name: {selectedPrisoner.cell}
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
                                {selectedPrisoner.gender}
                              </b>
                            </div>

                            <div className="d-flex justify-content-between w-100 py-1 px-3">
                              <b className="fw-semibold">Age:</b>
                              <b className="fw-normal">{selectedPrisoner.age}</b>
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
                                {selectedPrisoner.status}
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
    </>
  );
}

export default PrisonerTable