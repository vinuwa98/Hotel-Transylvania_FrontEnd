import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../atoms/Button";
import Table from "./Table/Table"; // Reusing the shared table component

const SupervisorComplaintTable = () => {
  const { activeUser } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints created by the logged-in supervisor
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        if (!activeUser || !activeUser.userId || !activeUser.token) {
          console.warn("Active user or token not loaded yet");
          return;
        }

        const response = await axios.get(
          `https://localhost:7172/api/Complaint/supervisor-complaints/${activeUser.userId}`,
          {
            headers: {
              Authorization: `Bearer ${activeUser.token}`,
              Accept: "*/*",
            },
          }
        );

        setComplaints(response.data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchComplaints();
  }, [activeUser]);

  // Define columns for shared Table component
  const columns = [
    { header: "Room Number", accessor: "roomNumber" },
    { header: "Complaint Title", accessor: "title" },
    {
      header: "Cleaner Name",
      renderCell: (complaint) => complaint.cleanerName || "Not assigned",
    },
    {
      header: "Actions",
      renderCell: (complaint) => (
        <div className="flex justify-center gap-2">
          <Button
            label="Assign"
            className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            onClick={() => console.log("Assign", complaint.id)}
          />
          <Button
            label="Delete"
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            onClick={() => console.log("Delete", complaint.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Complaints</h2>
      <div className="overflow-x-auto rounded shadow-lg">
        <Table columns={columns} data={complaints} />
      </div>
    </div>
  );
};

export default SupervisorComplaintTable;
