import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { exportToCSV, exportToPDF } from '../../utils/index';
import SearchBar from '../SearchBar'; // Ensure the correct path

function GuardTable() {
  const [guards, setGuards] = useState([]);
  const [filteredGuards, setFilteredGuards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuard, setSelectedGuard] = useState(null);

  const [currentGuard, setCurrentGuard] = useState(null);

  const handleExportCSV = () => {
    exportToCSV(filteredGuards, "guards_csv");
  };

  const handleExportPDF = () => {
    exportToPDF(filteredGuards, "guards_pdf");
  };

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/guards/");
        const guardData = response.data;
        setGuards(guardData);
        setFilteredGuards(guardData);
      } catch (error) {
        console.error("Error fetching guards:", error);
      }
    };

    fetchGuards();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = guards.filter(
      (guard) =>
        guard.first_name.toLowerCase().includes(lowerCaseQuery) ||
        guard.last_name.toLowerCase().includes(lowerCaseQuery) ||
        guard.cell_name.toLowerCase().includes(lowerCaseQuery) ||
        guard.gender_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredGuards(filteredData);
  }, [searchQuery, guards]);

  const openModal = (guard) => {
    setSelectedGuard(guard);
  };

  const closeModal = () => {
    setSelectedGuard(null);
  };

  //  Delete and Update Cell Details Handle
  const handleEditClick = (guard) => {
    setCurrentGuard(guard);
  };

  const handleDeleteClick = (guard) => {
    setCurrentGuard(guard);
  };


    const fetchGuards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/cells/"
        );
        const guardData = response.data;
        setGuards(guardData);
      } catch (error) {
        console.error("Error fetching guards:", error);
      }
    };

  // Delete Guard Function
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/guards/${currentGuard.id}/`)
      .then((response) => {
        if (response.status === 200) {
          fetchGuards(setGuards); // Refresh the prisoner list
          alert("Failed To Delete guard");
        } else {
          alert("Guard Deleted Succesfully");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
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
              <th scope="col">Gender</th>
              <th scope="col">Cell Assigned</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredGuards].reverse().map((guard) => (
              <tr key={guard.id} className="align-items-center">
                <td>
                  <img
                    src={guard.photo}
                    alt="guard-photo"
                    className="prisoner-photo"
                  />
                </td>
                <td>
                  {guard.first_name} {guard.last_name}
                </td>
                <td>{guard.age}</td>
                <td>{guard.gender_name}</td>
                <td>{guard.cell_name}</td>
                <td className="table-icons d-flex gap-3 w-100 justify-content-center">
                  <img
                    src="/src/assets/scan.svg"
                    alt="details_icon"
                    data-bs-toggle="modal"
                    data-bs-target="#guardDetailsModal"
                    onClick={() => openModal(guard)}
                  />
                  <img
                    src="/src/assets/edit-2.svg"
                    alt="edit_icon"
                    data-bs-target="#editGuardModal"
                    data-bs-toggle="modal"
                  />
                  <img src="/src/assets/trash.svg" alt="delete_icon" data-bs-target="#deleteGuardModal"  data-bs-toggle ="modal"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Guard Details Modal */}
        <div
          className="modal fade"
          id="guardDetailsModal"
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

              <div className="modal-body">
                {selectedGuard && (
                  <div className="guardDetailsContent d-flex gap-4">
                    <div className="photo-text">
                      <img
                        src={selectedGuard.photo}
                        alt="guard-photo"
                        className="guard-photo"
                      />
                      <p className="fs-5 fw-semibold mt-3">
                        {selectedGuard.first_name} {selectedGuard.last_name}
                      </p>
                      <p className="mb-2 fs-6">Prison Guard</p>
                    </div>

                    <div className="section-modal w-100">
                      <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-4">
                        <b className="fw-semibold">First Name:</b>
                        <b className="fw-normal">{selectedGuard.first_name}</b>
                      </div>

                      <div className="d-flex justify-content-between w-100 py-1 px-3">
                        <b className="fw-semibold">Last Name:</b>
                        <b className="fw-normal">{selectedGuard.last_name}</b>
                      </div>

                      <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                        <b className="fw-semibold">Age:</b>
                        <b className="fw-normal">{selectedGuard.age}</b>
                      </div>

                      <div className="d-flex justify-content-between w-100 py-1 px-3">
                        <b className="fw-semibold">Cell Assigned:</b>
                        <b className="fw-normal">
                          {selectedGuard.cell_assigned}
                        </b>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* End of Guard Details Modal */}

        {/* Edit Guard Details Modal */}
        {selectedGuard && (
          <div
            class="modal fade"
            id="editGuardModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit Guard Details
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">{/* Enter fields here */}</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End of edit guard details */}

        {/* Delete Prisoner alert modal */}
        {selectedGuard && (
          <div
            class="modal fade"
            id="deleteGuardModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-center" id="exampleModalLabel">
                    Delete Guard
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <img
                    src="/src/assets/danger.svg"
                    alt=""
                    className="my-4 img-fluid"
                  />
                  <p className="text-center fs-5">
                    Are you sure you want to delete this guard?
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
      </div>
    </>
  );
}

export default GuardTable;
