import { useEffect, useState } from "react";
import { createJob } from "../../services/jobService";
import { themeColors } from "../../Theme/colors";
import Button from "../../Components/atoms/Button";
import JobCreateForm from "../../Components/molecules/JobCreateForm";
import Table from "./Table/Table";
import { getAllComplaints } from "../../services/complaintService";

function ComplaintsSection() {
  const [showCreateJobModal, setShowJobCreateModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [currentComplaintData, setCurrentComplaintData] = useState(null);

  const handleCreateJob = (complaintData) => {
    setCurrentComplaintData(complaintData);
    setShowJobCreateModal(true);
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
            label="Create a Job"
            className="w-fit px-4 py-2 rounded-md mb-4 hover:opacity-90 transition"
            style={{
              backgroundColor: themeColors.Green,
              color: themeColors.White,
            }}
            onClick={() => handleCreateJob(complaint)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllComplaints()
      .then((complaints) => {
        setComplaints(complaints);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Manage Complaints</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {currentComplaintData && (
          <JobCreateForm
            complaintData={currentComplaintData}
            open={showCreateJobModal}
            onClose={() => setShowJobCreateModal(false)}
            handleSubmit={async (submitData) => {
              await createJob(submitData.form, submitData.token).then(() => {
                setShowJobCreateModal(false);
              });
            }}
          />
        )}

        <Table columns={columns} data={complaints} />
      </div>
    </div>
  );
}

export default ComplaintsSection;
