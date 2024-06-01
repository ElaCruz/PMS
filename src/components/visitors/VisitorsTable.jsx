import React from "react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useAsyncError } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function VisitorsTable() {
  const [visitors, setVisitors] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/visitors/");
        const visitorData = response.data;
        setVisitors(visitorData);
      } catch (error) {
        console.error("Error fetching visitor", error);
      }
    };

    fetchVisitors();
  }, []);

  // For the cell UseEffect
  useEffect(() => {
    const fetchCellNames = async () => {
      const cellIds = visitors.map((visitor) => guard.cell);
      const cellNames = await getCellNames(cellIds);

      const visitorsWithCellNames = guards.map((visitor, index) => {
        return {
          ...visitor,
          cellName: cellNames[index],
        };
      });

      setVisitors(visitorsWithCellNames);
    };

    fetchCellNames();
  }, [visitors]);

  // Visitor Details Modal
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);

  const openModal = (prisoner) => {
    setSelectedPrisoner(prisoner);
  };

  const closeModal = () => {
    setSelectedPrisoner(null);
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
            <th scope="col">Name</th>
            <th scope="col">Relation</th>
            <th scope="col">Visited Inmate</th>
            {/* <th scope="col">Cell</th> */}
            <th scope="col">Gender</th>
            <th scope="col">Date Visited</th>
            <th scope="col">Actions</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {[...visitors].reverse().map((visitor) => (
            <tr key={visitor.id} className=" align-items-center">
              {/* <td>{prisoner.photo} </td> */}
              <td>
                {visitor.full_name} 
              </td>
              <td>{visitor.relation}</td>
              {/* <td>{prr.cell}</td> */}
              <td>{visitor.prisoner_visited_name}</td>
              <td>{visitor.gender_name}</td>
              <td>{visitor.date_visited}</td>
              <td className="table-icons d-flex gap-3 w-100 justify-content-center">
                <img
                  src="/src/assets/scan.svg"
                  alt="details_icon"
                  data-bs-toggle="modal"
                  data-bs-target="#prisonerDetailsModal"
                  //   onClick={() => openModal(prisoner)}
                />
                <img src="/src/assets/edit-2.svg" alt="edit_icon" />
                <img src="/src/assets/trash.svg" alt="delete_icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisitorsTable;
