import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../atoms/Button";
import Table from "./Table/Table";
//Import your modal component
import Modal from "../molecules/modal";
import {
  getComplaintsBySupervisor,
  deactivateComplaint,
} from "../../services/userService";

const SupervisorComplaintTable = () => {
  const { activeUser } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  // Fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        if (!activeUser?.userId || !activeUser?.token) return;

        const response = await getComplaintsBySupervisor(
          activeUser.userId,
          activeUser.token
        );
        setComplaints(response);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchComplaints();
  }, [activeUser]);

  // Show modal for selected complaint
  const openDeleteModal = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setModalOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await deactivateComplaint(selectedComplaintId, activeUser.token);
      setComplaints((prev) =>
        prev.filter((c) => c.complaintId !== selectedComplaintId)
      );
    } catch (error) {
      console.error("Error deleting complaint:", error);
      alert("Failed to delete complaint.");
    } finally {
      setModalOpen(false);
      setSelectedComplaintId(null);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setModalOpen(false);
    setSelectedComplaintId(null);
  };

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
            label="Delete"
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            onClick={() => openDeleteModal(complaint.complaintId)}
            
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

      {/*Delete Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this complaint?"
      />
    </div>
  );
};

export default SupervisorComplaintTable;
