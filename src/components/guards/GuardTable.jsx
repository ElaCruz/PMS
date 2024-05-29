import React from "react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useAsyncError } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function GuardTable() {
  const [guards, setGuards] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/guards/"
        );
        const guardData = response.data;
        setGuards(guardData);
      } catch (error) {
        console.error("Error fetching guards:", error);
      }
    };

    fetchGuards();
  }, []);

  // For the cell UseEffect
  useEffect(() => {
    const fetchCellNames = async () => {
      const cellIds = guards.map((guard) => guard.cell);
      const cellNames = await getCellNames(cellIds);

      const guardsWithCellNames = guards.map((guard, index) => {
        return {
          ...guard,
          cellName: cellNames[index],
        };
      });

      setGuards(guardsWithCellNames);
    };

    fetchCellNames();
  }, [guards]);

  // Prisoner Details Modal
  const [selectedGuard, setSelectedGuard] = useState(null);

  const openModal = (guard) => {
    setSelectedGuard(guard);
  };

  const closeModal = () => {
    setSelectedGuard(null);
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
            {/* <th scope="col">Cell</th> */}
            <th scope="col">Gender</th>
            <th scope="col">Cell Assigned</th>
            <th scope="col">Actions</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {[...guards].reverse().map((guard) => (
            <tr key={guard.id} className=" align-items-center">
              {/* <td>{prisoner.photo} </td> */}
              <td>
                {" "}
                <img
                  src={guard.photo}
                  alt="guard-photo"
                  className="prisoner-photo"
                />{" "}
              </td>
              <td>
                {guard.first_name} {guard.last_name}
              </td>
              <td>{guard.age}</td>
              {/* <td>{prr.cell}</td> */}
              <td>{guard.gender}</td>
              <td>{guard.cell}</td>
              <td className="table-icons d-flex gap-3 w-100 justify-content-center">
                <img
                  src="/src/assets/scan.svg"
                  alt="details_icon"
                  data-bs-toggle="modal"
                  data-bs-target="#guardDetailsModal"
                  onClick={() => openModal(guard)}
                />
                <img src="/src/assets/edit-2.svg" alt="edit_icon" />
                <img src="/src/assets/trash.svg" alt="delete_icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Guard Details Modal */}
      <div
        class="modal fade  "
        id="guardDetailsModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
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

                  {/* Other Details Here */}
                  <div className="section-modal w-100 ">
                    {/* Detail row */}
                    <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-4">
                      <b className="fw-semibold">First Name:</b>
                      <b className="fw-normal">{selectedGuard.first_name}</b>
                    </div>

                    {/* Detail row */}
                    <div className="d-flex justify-content-between w-100 py-1 px-3">
                      <b className="fw-semibold">Last Name:</b>
                      <b className="fw-normal">{selectedGuard.last_name}</b>
                    </div>

                    {/* Detail row */}
                    <div className="tab-detail-striped d-flex justify-content-between w-100 py-1 px-3">
                      <b className="fw-semibold">Age:</b>
                      <b className="fw-normal">{selectedGuard.age}</b>
                    </div>

                    {/* Detail row */}
                    <div className="d-flex justify-content-between w-100 py-1 px-3">
                      <b className="fw-semibold">Cell Assigned:</b>
                      <b className="fw-normal">{selectedGuard.cell_assigned}</b>
                    </div>

                  </div>
                  {/* End of Other Details Here */}
                </div>
              )}
            </div>
            {/* End of Modal Body */}
          </div>
        </div>
      </div>
      {/* End of Guard Modal */}
    </div>
  );
}

export default GuardTable;
