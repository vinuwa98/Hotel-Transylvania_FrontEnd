import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../atoms/Button";
import Table from "./Table/Table";
import Modal from "../molecules/Modal";
import axios from "axios";

const AssignCleanerTable = () => {
  const { activeUser } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [selectedCleanerId, setSelectedCleanerId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load supervisor complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7172/api/Complaint/supervisor-complaints/${activeUser.userId}`,
          {
            headers: {
              Authorization: `Bearer ${activeUser.token}`,
            },
          }
        );
        setComplaints(res.data);
      } catch (err) {
        console.error("Error loading complaints:", err);
      }
    };

    fetchComplaints();
  }, [activeUser]);

  // Load all cleaners
  const fetchCleaners = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7172/api/User/get-cleaners`,
        {
          headers: {
            Authorization: `Bearer ${activeUser.token}`,
          },
        }
      );
      setCleaners(res.data);
    } catch (err) {
      console.error("Error loading cleaners:", err);
    }
  };

  const openAssignModal = (complaintId) => {
    setSelectedComplaintId(complaintId);
    fetchCleaners();
    setModalOpen(true);
  };

  const assignCleaner = async () => {
    try {
      await axios.post(
        `https://localhost:7172/api/Complaint/assign-cleaner`,
        {
          complaintId: selectedComplaintId,
          cleanerId: selectedCleanerId,
        },
        {
          headers: {
            Authorization: `Bearer ${activeUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Cleaner assigned successfully.");
      setModalOpen(false);
      setSelectedCleanerId(null);
      setSelectedComplaintId(null);
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Failed to assign cleaner.");
    }
  };

  const columns = [
    { header: "Room Number", accessor: "roomNumber" },
    { header: "Complaint Title", accessor: "title" },
    { header: "Cleaners", accessor: "cleanerName" },
    {
      header: "Actions",
      renderCell: (complaint) => (
        <Button
          label="Assign"
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => openAssignModal(complaint.complaintId)}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Assign Cleaners</h2>
      <div className="overflow-x-auto rounded shadow-lg">
        <Table columns={columns} data={complaints} />
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={assignCleaner}
        message={
          <div>
            <p>Select a cleaner to assign:</p>
            <select
              className="mt-4 w-full p-2 border rounded"
              value={selectedCleanerId || ""}
              onChange={(e) => setSelectedCleanerId(e.target.value)}
            >
              <option value="">-- Select Cleaner --</option>
              {cleaners.map((cleaner) => (
                <option key={cleaner.id} value={cleaner.id}>
                  {cleaner.fullName}
                </option>
              ))}
            </select>
          </div>
        }
        messageType="confirm"
      />
    </div>
  );
};

export default AssignCleanerTable;
