import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToCSV, exportToPDF } from '../../utils/index';
import SearchBar from '../SearchBar'; // Ensure the correct path

function VisitorsTable() {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedVisitor, setSelectedVisitor] = useState(null);
    const [editVisitor, setEditVisitor] = useState(null);
    const [deleteVisitor, setDeleteVisitor] = useState(null);

  // Visitor Details Modal
 const openModal = (visitor) => {
   setSelectedVisitor(visitor);
 }

  const closeModal = () => {
    setSelectedVisitor(null);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredVisitors, 'visitors_csv');
  };

  const handleExportPDF = () => {
    exportToPDF(filteredVisitors, 'visitors_pdf');
  };

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/visitors/");
        const visitorData = response.data;
        setVisitors(visitorData);
        setFilteredVisitors(visitorData);
      } catch (error) {
        console.error("Error fetching visitors", error);
      }
    };

    fetchVisitors();
  }, []);


  // Update Visitor Handle
  const updateVisitor = async (visitor) => {
    try {
      await axios.put(
        `http://localhost:8000/api/visitors/${visitor.id}`,
        visitor
      );
      setVisitors((prevVisitors) =>
        prevVisitors.map((prevVisitor) =>
          prevVisitor.id === visitor.id ? visitor : prevVisitor
        )
      );
      setEditVisitor(null);
    } catch (error) {
      console.error("Error updating visitor:", error);
    }
  };

  // Delete Visitor
    const deleteVisitorFromDB = async (visitor) => {
      try {
        await axios.delete(`http://localhost:8000/api/visitors/${visitor.id}`);
        setVisitors((prevVisitors) =>
          prevVisitors.filter((prevVisitor) => prevVisitor.id !== visitor.id)
        );
        setDeleteVisitor(null);
      } catch (error) {
        console.error("Error deleting visitor:", error);
      }
    };

  
    const handleEditFormSubmit = (event) => {
      event.preventDefault();
      updateVisitor(editVisitor);
    };

    const handleEditFormCancel = () => {
      setEditVisitor(null);
    };

    const handleDeleteConfirm = () => {
      deleteVisitorFromDB(deleteVisitor);
    };

    const handleDeleteCancel = () => {
      setDeleteVisitor(null);
    };


  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = visitors.filter((visitor) =>
      visitor.full_name.toLowerCase().includes(lowerCaseQuery) ||
      visitor.relation.toLowerCase().includes(lowerCaseQuery) ||
      visitor.prisoner_visited_name.toLowerCase().includes(lowerCaseQuery) ||
      visitor.gender_name.toLowerCase().includes(lowerCaseQuery) ||
      visitor.date_visited.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredVisitors(filteredData);
  }, [searchQuery, visitors]);

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
              <th scope="col">Name</th>
              <th scope="col">Relation</th>
              <th scope="col">Visited Inmate</th>
              <th scope="col">Gender</th>
              <th scope="col">Date Visited</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredVisitors].reverse().map((visitor) => (
              <tr key={visitor.id} className="align-items-center">
                <td>{visitor.full_name}</td>
                <td>{visitor.relation}</td>
                <td>{visitor.prisoner_visited_name}</td>
                <td>{visitor.gender_name}</td>
                <td>{visitor.date_visited}</td>
                <td className="table-icons d-flex gap-3 w-100 justify-content-center">
                  <img
                    src="/src/assets/scan.svg"
                    alt="details_icon"
                    data-bs-toggle="modal"
                    data-bs-target="#visitorDetailsModal"
                    onClick={() => openModal(visitor)}
                  />
                  <img
                    src="/src/assets/edit-2.svg"
                    alt="edit_icon"
                    data-bs-target="#editVisitorModal"
                    data-bs-toggle="modal"
                    onClick={() => setEditVisitor(visitor)}
                  />
                  <img
                    src="/src/assets/trash.svg"
                    alt="delete_icon"
                    data-bs-target="#deleteVisitorModal"
                    data-bs-toggle="modal"
                    onClick={() => setDeleteVisitor(visitor)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Visitor Details Modals */}
        <div
          class="modal fade"
          id="visitorDetailsModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Visitor Details
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {selectedVisitor && (
                  <div>
                    <p className="fs-6 mt-3">
                      <b>Full Name:</b> {selectedVisitor.full_name}
                    </p>
                    <p>
                      <b>Visited Inmate:</b>{" "}
                      {selectedVisitor.prisoner_visited_name}
                    </p>

                    <p>
                      <b>Relation:</b> {selectedVisitor.relation}
                    </p>

                    <p>
                      <b>Gender:</b> {selectedVisitor.gender_name}
                    </p>

                    <p>
                      <b>Date Visited:</b> {selectedVisitor.date_visited}
                    </p>

                    <p>
                      <b>Time Of Arrival:</b> {selectedVisitor.time_of_arrival}
                    </p>

                    <p>
                      <b>Time Of Departure:</b>{" "}
                      {selectedVisitor.time_of_departure}
                    </p>

                    <p>
                      <b>Telephone:</b> {selectedVisitor.phone_number}
                    </p>
                  </div>
                )}
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
        {/* End of Visitor Details Modal */}

        {/* Edit Visitor Modal */}
        {/* Edit Visitor Modal */}
        {editVisitor && (
          <div
            class="modal fade"
            id="editVisitorModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={handleEditFormSubmit}>
                    <label htmlFor="editName">Full Name:</label>
                    <input
                      type="text"
                      id="editName"
                      value={editVisitor.full_name}
                      onChange={(e) =>
                        setEditVisitor({
                          ...editVisitor,
                          full_name: e.target.value,
                        })
                      }
                    />
                    <button type="submit" class="btn btn-primary">
                      Save Changes
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      onClick={handleEditFormCancel}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
                <div class="modal-footer">
                  {/* <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* End of Edit Visitor Modal */}

        {/* Delete Visitor Modal */}
        {deleteVisitor && (
          <div
            class="modal fade"
            id="deleteVisitorModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Delete Visitor
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <img src="/src/assets/danger.svg" alt="" />
                  <p>
                    Are you sure you want to delete{" "}
                    <span className="text-danger">
                      {deleteVisitor.full_name}
                    </span>
                    ?
                  </p>
                  <button
                    data-bs-dismiss="modal"
                    className="btn  btn-outline-danger"
                    onClick={handleDeleteCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
                  </button>
                </div>
                <div class="modal-footer">
                  {/* <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VisitorsTable;
