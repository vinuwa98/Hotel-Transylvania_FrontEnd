import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../atoms/Button";

const SupervisorComplaintTable = () => {
  const { activeUser } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // Wait for user info to load
        if (!activeUser || !activeUser.userId || !activeUser.token) {
          console.warn("Active user or token not loaded yet");
          return;
        }

        // Fetch complaints from backend using token
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Complaints</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Complaint Title</th>
            <th>Cleaner Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.roomNumber}</td>
              <td>{complaint.title}</td>
              <td>{complaint.cleanerName || "Not assigned"}</td>
              <td>
                <button className="text-blue-500">Assign</button>
                <button className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorComplaintTable;
