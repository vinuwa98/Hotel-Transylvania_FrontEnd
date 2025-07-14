import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "../atoms/Input";
import DropdownList from "../atoms/DropdownList";
import { useFormik } from "formik";

const JobCreateForm = ({ open, onClose, handleSubmit }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      complaintId: "",
      jobDescription: "",
      jobPriority: "low",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await handleSubmit({
          form: values,
          token: localStorage.getItem("token"),
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const priorities = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const modalStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const formStyles = {
    width: "40vw",
    overflowY: "auto",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  const FieldTitle = ({ children }) => (
    <Typography variant="subtitle2" fontWeight="bold">
      {children}
    </Typography>
  );

  return (
    <Modal sx={modalStyles} open={open} onClose={onClose}>
      <Box sx={formStyles} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
          Create Job
        </Typography>

        <FieldTitle>Job Title</FieldTitle>
        <Input
          type="text"
          name="jobTitle"
          placeholder="Enter job title"
          value={formik.values.jobTitle}
          onChange={formik.handleChange}
          required
        />

        <FieldTitle>Complaint ID</FieldTitle>
        <Input
          type="text"
          name="complaintId"
          placeholder="Enter complaint ID"
          value={formik.values.complaintId}
          onChange={formik.handleChange}
          isDisabled={true}
          required
        />

        <FieldTitle>Job Description</FieldTitle>
        <Input
          type="text"
          name="jobDescription"
          placeholder="Enter job description"
          value={formik.values.jobDescription}
          onChange={formik.handleChange}
          required
        />

        <FieldTitle>Job Priority</FieldTitle>
        <DropdownList
          name="jobPriority"
          value={formik.values.jobPriority}
          onChange={formik.handleChange}
          options={priorities}
          required
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid || !formik.dirty || loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default JobCreateForm;
