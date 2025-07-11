import React, { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { themeColors } from "../../Theme/colors";
import Button from "../atoms/Button";
import { LayoutDashboard } from "lucide-react";

function HelpDeskSection() {
  // Example complaints data
  const [complains, setComplains] = useState([
    {
      id: 1,
      complainNumber: "C001",
      title: "Leaky Faucet",
      dateTime: "2024-06-10 10:00",
      description:
        "This is a very long complaint description that should be truncated with ellipsis when it exceeds the maximum width of the table cell.",
    },
    {
      id: 2,
      complainNumber: "C002",
      title: "Noisy AC",
      dateTime: "2024-06-11 14:30",
      description: "The air conditioner in room 202 is making noise.",
    },
  ]);

  // Example jobs data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobNumber: "J001",
      jobName: "Fix Faucet",
      description: "Fix the leaky faucet in room 101.",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 2,
      jobNumber: "J002",
      jobName: "Repair AC",
      description: "Repair the noisy AC in room 202.",
      status: "In Progress",
      priority: "High",
    },
  ]);

  // Handler for deleting a job
  const handleDeleteJob = (id) => {
    // setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    alert(`Deleting job ${id}`);
  };

  // Example rooms data
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: "101",
      roomType: "Single",
      status: "Available",
    },
    {
      id: 2,
      roomNumber: "102",
      roomType: "Double",
      status: "Unavailable",
    },
  ]);

  // Handler for changing room status
  const handleStatusChange = (id, newStatus) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, status: newStatus } : room
      )
    );
  };

  // Handler for changing job priority
  const handlePriorityChange = (id, newPriority) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, priority: newPriority } : job
      )
    );
  };

  // Dummy handler for creating a job
  const handleCreateJob = (id) => {
    // Implement your logic here, e.g., navigate or open a modal
    alert(`Create a job for complaint ID: ${id}`);
  };

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: themeColors.Gray }}
    >
      <div className="flex flex-col flex-1">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Help Desk</h2>
        </div>
      </div>
    </div>
  );
}

export default HelpDeskSection;
