import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { exportToCSV, exportToPDF } from "../utils/index";

function CellTable() {
  const [cells, setCells] = useState([]);
  // const [currentCell, setCurrentCell] = useState(null);
  const [prisoners, setPrisoners] = useState([]);
  const [guards, setGuards] = useState([]);
  const [filteredCells, setFilteredCells] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCell, setEditingCell] = useState("");
  const [deletingCell, setDeletingCell] = useState("");
  const [cellDetails, setCellDetails] = useState("");

  // Fetch Cells
  useEffect(() => {
    const fetchCells = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cells/");
        const cellData = response.data;
        setCells(cellData);
        setFilteredCells(cellData);
      } catch (error) {
        console.error("Error fetching cell", error);
      }
    };

    fetchCells();
  }, []);

  // Fetch Prisoners
  useEffect(() => {
    const fetchPrisoners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/prisoners/"
        );
        const prisonerData = response.data;
        setPrisoners(prisonerData);
      } catch (error) {
        console.error("Error fetching prisoners", error);
      }
    };

    fetchPrisoners();
  }, []);

  // Fetch Guards
  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/guards/");
        const guardData = response.data;
        setGuards(guardData);
      } catch (error) {
        console.error("Error fetching guards", error);
      }
    };

    fetchGuards();
  }, []);

  const getPrisonerCountInCell = (cellId) => {
    const prisonersInCell = prisoners.filter(
      (prisoner) => prisoner.cell === cellId
    );
    return prisonersInCell.length;
  };

  const getAssignedGuardsInCell = (cellId) => {
    const assignedGuards = guards.filter((guard) => guard.cell === cellId);
    return assignedGuards
      .map((guard) => `${guard.first_name} ${guard.last_name}`)
      .join(", ");
  };

  // SearchBar Functionality
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = cells.filter((cell) =>
      cell.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCells(filteredData);
  }, [searchQuery, cells]);


  // Delete Cell
  const deleteCell = async (cellId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cells/${deleteCell.id}/`);
      const updatedCells = cells.filter((cell) => cell.id !== cellId);
      setCells(updatedCells);
      setFilteredCells(updatedCells);
      setDeletingCell(null); 
      alert("Cell deleted Successfully")
    } catch (error) {
      console.error("Error deleting cell", error);
      // Show error message or perform error handling
    }
  };

  // Edit Cell
  const editCell = async (updatedCell) => {
    try {
      await axios.put(
        `http://localhost:8000/api/cells/${updatedCell.id}/`,
        updatedCell
      );
      const updatedCells = cells.map((cell) => {
        if (cell.id === updatedCell.id) {
          return updatedCell;
        }
        return cell;
      });
      setCells(updatedCells);
      setFilteredCells(updatedCells);
      setEditingCell("");
      alert("Cell updated Successfully")
    } catch (error) {
      console.error("Error editing cell", error);
    }
  };

  // Export Options
  const handleExportCSV = () => {
    exportToCSV(filteredCells, "cells_csv");
  };

  const handleExportPDF = () => {
    exportToPDF(filteredCells, "cells_pdf");
  };

  const handleEditCell = (cell) => {
    setEditingCell(cell);
  };

  const handleDeleteCell = (cell) => {
    setDeletingCell(cell);
  };

  const handleCellDetails = (cell) => {
    setCellDetails(cell);
  };

  return (
    <>
      <div className="d-flex justify-content-between searchbar-start">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="cell-table">
        <div className="export-group d-flex align-items-center gap-3 mt-3">
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

        <table className="table table-striped table-hovertable-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cell Name</th>
              <th>Number of Prisoners</th>
              <th>Assigned Guards</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCells.map((cell) => (
              <tr key={cell.id}>
                <td>00{cell.id}</td>
                <td>{cell.name}</td>
                <td>{getPrisonerCountInCell(cell.id)}</td>
                <td>{getAssignedGuardsInCell(cell.id)}</td>
                <td className="table-icons d-flex gap-3 w-100 justify-content-center">
                  <img
                    src="../../src/assets/scan.svg"
                    data-bs-target="#cellDetailsModal"
                    data-bs-toggle="modal"
                    onClick={() => handleCellDetails(cell)}
                  />

                  <img
                    src="../../src/assets/edit-2.svg"
                    onClick={() => handleEditCell(cell)}
                    data-bs-target="#editCellModal"
                    data-bs-toggle="modal"
                  />
                  <img
                    data-bs-target="#deleteCellModal"
                    data-bs-toggle="modal"
                    src="../../src/assets/trash.svg"
                    onClick={() => handleDeleteCell(cell)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Cell Modal */}
      {editCell && (
        <div
          class="modal fade"
          id="editCellModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Cell
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <input
                  type="text"
                  value={editingCell.name}
                  onChange={(e) =>
                    setEditingCell({ ...editingCell, name: e.target.value })
                  }
                />
              </div>
              <div class="modal-footer">
                <button data-bs-dismiss="modal" className="btn btn-danger">
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => editCell(editingCell)}
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCell && (
        <div
          class="modal fade"
          id="deleteCellModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center" id="exampleModalLabel">
                  Delete Cell
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
                  Are you sure you want to delete{" "}
                  <span className="text-danger fs-5">{deletingCell.name}</span>?
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
                  onClick={() => deleteCell(deletingCell.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cell Details Modal */}
      {cellDetails && (
        <div
          class="modal fade"
          id="cellDetailsModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Cell Detail
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="modal-content">
                  <h3>{cellDetails.name}</h3>
                  <p>ID: 00{cellDetails.id}</p>
                  <p>Name: {cellDetails.name}</p>
                  <p>
                    Number of Prisoners:{" "}
                    {getPrisonerCountInCell(cellDetails.id)}
                  </p>
                  <p>
                    Assigned Guards: {getAssignedGuardsInCell(cellDetails.id)}
                  </p>
                </div>
              </div>
              <div class="modal-footer"> </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CellTable;