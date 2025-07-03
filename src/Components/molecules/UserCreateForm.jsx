import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "../atoms/Input";
import DropdownList from "../atoms/DropdownList";
import { useFormik } from "formik";
import userSchema from "../../schemas/userSchema";

const UserForm = ({ open, onClose, handleSubmit }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      dob: "",
      address: "",
      role: "",
      supervisorID: "",
      contactNumber: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      handleSubmit({ form: values, token: localStorage.getItem("token") });
    },
  });

  const roles = [
    "Cleaner",
    "HelpDesk",
    "Supervisor",
    "MaintenanceStaff",
    "MaintenanceManager",
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

  return (
    <Modal sx={modalStyles} open={open} onClose={onClose}>
      <Box sx={formStyles} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={2}>
          Add User
        </Typography>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.email)}
          required
        />
        {formik.errors.email && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.email}
          </Typography>
        )}

        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.firstName)}
          required
        />
        {formik.errors.firstName && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.firstName}
          </Typography>
        )}

        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.lastName)}
        />
        {formik.errors.lastName && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.lastName}
          </Typography>
        )}

        <Input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formik.values.dob}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.dob)}
        />
        {formik.errors.dob && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.dob}
          </Typography>
        )}

        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.address)}
          required
        />
        {formik.errors.address && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.address}
          </Typography>
        )}

        <DropdownList
          name="role"
          value={formik.values.role}
          onChange={(e) => {
            formik.handleChange(e);
            setSelectedRole(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.role)}
          required
          options={roles}
          placeholder="Select Role"
        />
        {formik.errors.role && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.role}
          </Typography>
        )}

        {selectedRole === "Cleaner" && (
          <>
            <Input
              type="text"
              name="supervisorID"
              placeholder="Supervisor ID (e.g., SUP123456)"
              value={formik.values.supervisorID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.supervisorID)}
            />
            {formik.errors.supervisorID && (
              <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                {formik.errors.supervisorID}
              </Typography>
            )}
          </>
        )}

        <Input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.contactNumber)}
        />
        {formik.errors.contactNumber && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.contactNumber}
          </Typography>
        )}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.password)}
          required
        />
        {formik.errors.password && (
          <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
            {formik.errors.password}
          </Typography>
        )}

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid || !formik.dirty}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserForm;
