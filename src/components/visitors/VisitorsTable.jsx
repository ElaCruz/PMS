import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToCSV, exportToPDF } from '../../utils/index';
import SearchBar from '../SearchBar'; // Ensure the correct path

function VisitorsTable() {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
                    //   onClick={() => openModal(visitor)}
                  />
                  <img src="/src/assets/edit-2.svg" alt="edit_icon" />
                  <img src="/src/assets/trash.svg" alt="delete_icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VisitorsTable;
