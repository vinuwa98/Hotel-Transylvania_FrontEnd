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

          <h3 className="text-2xl pb-3 pt-7">All Rooms</h3>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full text-12 text-center border-collapse">
              <thead
                style={{
                  backgroundColor: themeColors.DarkBlue,
                  color: themeColors.White,
                }}
              >
                <tr>
                  <th className="px-6 py-3 font-medium">Room No</th>
                  <th className="px-6 py-3 font-medium">Room Type</th>
                  <th className="px-6 py-3 font-medium">Availability</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length !== 0 &&
                  rooms.map((room, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-6 py-4">{room.roomNumber}</td>
                      <td className="px-6 py-4">{room.roomType}</td>
                      <td className="px-6 py-4">
                        <select
                          value={room.status}
                          onChange={(e) =>
                            handleStatusChange(room.id, e.target.value)
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                {rooms.length === 0 && (
                  <tr>
                    <td
                      className="px-6 py-4 text-center"
                      colSpan="3"
                      style={{ color: themeColors.Gray500 }}
                    >
                      No rooms found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl pb-3">All Complaints</h3>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full text-12 text-center border-collapse">
              <thead
                style={{
                  backgroundColor: themeColors.DarkBlue,
                  color: themeColors.White,
                }}
              >
                <tr>
                  <th className="px-6 py-3 font-medium">Complain No</th>
                  <th className="px-6 py-3 font-medium">Title</th>
                  <th className="px-6 py-3 font-medium">Date & Time</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {complains.length !== 0 &&
                  complains.map((complain, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-6 py-4">{complain.complainNumber}</td>
                      <td className="px-6 py-4">{complain.title}</td>
                      <td className="px-6 py-4">{complain.dateTime}</td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        {complain.description}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          label="Create a Job"
                          className="w-32"
                          onClick={() => handleCreateJob(complain.id)}
                          style={{
                            backgroundColor: themeColors.LightBlue,
                            color: themeColors.White,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                {complains.length === 0 && (
                  <tr>
                    <td
                      className="px-6 py-4 text-center"
                      colSpan="5"
                      style={{ color: themeColors.Gray500 }}
                    >
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* <h3 className="text-2xl pb-3 pt-7">All Jobs</h3>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full text-12 text-center border-collapse">
              <thead
                style={{
                  backgroundColor: themeColors.DarkBlue,
                  color: themeColors.White,
                }}
              >
                <tr>
                  <th className="px-6 py-3 font-medium">Job No</th>
                  <th className="px-6 py-3 font-medium">Job Name</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Priority</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length !== 0 &&
                  jobs.map((job, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-6 py-4">{job.jobNumber}</td>
                      <td className="px-6 py-4">{job.jobName}</td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        {job.description}
                      </td>
                      <td className="px-6 py-4">{job.status}</td>
                      <td className="px-6 py-4">
                        <select
                          value={job.priority}
                          onChange={(e) =>
                            handlePriorityChange(job.id, e.target.value)
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          className="h-10 flex items-center justify-center"
                          onClick={() => handleDeleteJob(job.id)}
                          style={{
                            backgroundColor: themeColors.Red,
                            color: themeColors.White,
                            borderRadius: "0.375rem",
                          }}
                          label={<Trash2Icon />}
                        />
                      </td>
                    </tr>
                  ))}
                {jobs.length === 0 && (
                  <tr>
                    <td
                      className="px-6 py-4 text-center"
                      colSpan="6"
                      style={{ color: themeColors.Gray500 }}
                    >
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HelpDeskSection;
