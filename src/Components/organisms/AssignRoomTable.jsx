import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../atoms/Button";
import Table from "./Table/Table";
import Modal from "../molecules/modal";
import axios from "axios";

const AssignRoomTable = () => {
  const { activeUser } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedCleanerId, setSelectedCleanerId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load all room assignments
  useEffect(() => {
    const fetchRoomAssignments = async () => {
      try {
        const res = await axios.get(`https://localhost:7172/api/Maintenance/room-assignments`, {
          headers: {
            Authorization: `Bearer ${activeUser.token}`,
          },
        });
        setRooms(res.data);
      } catch (err) {
        console.error("Error loading room assignments:", err);
      }
    };

    fetchRoomAssignments();
  }, [activeUser]);

  // Load all cleaners
  const fetchCleaners = async () => {
    try {
      const res = await axios.get(`https://localhost:7172/api/User/get-cleaners`, {
        headers: {
          Authorization: `Bearer ${activeUser.token}`,
        },
      });
      setCleaners(res.data);
    } catch (err) {
      console.error("Error loading cleaners:", err);
    }
  };

  const openAssignModal = (roomId) => {
    setSelectedRoomId(roomId);
    fetchCleaners();
    setModalOpen(true);
  };

  const assignCleaner = async () => {
    try {
      await axios.post(
        `https://localhost:7172/api/Maintenance/assign-room`,
        {
          roomId: selectedRoomId,
          cleanerId: selectedCleanerId,
        },
        {
          headers: {
            Authorization: `Bearer ${activeUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Cleaner assigned to room successfully.");
      setModalOpen(false);
      setSelectedCleanerId(null);
      setSelectedRoomId(null);
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Failed to assign cleaner to room.");
    }
  };

  const columns = [
    { header: "Room ID", accessor: "roomId" },
    { header: "Room Type", accessor: "roomType" },
    { header: "Cleaners", accessor: "cleanerNames", renderCell: (row) => row.cleanerNames.join(", ") },
    {
      header: "Actions",
      renderCell: (room) => (
        <Button
          label="Assign"
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => openAssignModal(room.roomId)}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Assign Cleaners to Rooms</h2>
      <div className="overflow-x-auto rounded shadow-lg">
        <Table columns={columns} data={rooms} />
      </div>

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

export default AssignRoomTable;
