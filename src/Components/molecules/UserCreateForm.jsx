import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "../atoms/Input";
import DropdownList from "../atoms/DropdownList";
import { useFormik } from "formik";
import userSchema from "../../schemas/userSchema";
import { getSupervisors } from "../../services/userService";
import { DropdownOption } from "../atoms/DropDownOption";

const UserForm = ({ open, onClose, handleSubmit }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [supervisors, setSupervisors] = useState([]);

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

  useEffect(() => {
    getSupervisors(localStorage.getItem("token")).then((data) =>
      setSupervisors(data.data)
    );
  }, []);

  const FieldTitle = ({ children }) => (
    <Typography variant="subtitle2" fontWeight="bold">
      {children}
    </Typography>
  );

  return (
    <Modal sx={modalStyles} open={open} onClose={onClose}>
      <Box sx={formStyles} component="form" onSubmit={formik.handleSubmit}>
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          mb={3}
        >
          Add User
        </Typography>

        <FieldTitle>Email</FieldTitle>
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
          <Typography variant="body2" color="error">
            {formik.errors.email}
          </Typography>
        )}

        <FieldTitle>First Name</FieldTitle>
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
          <Typography variant="body2" color="error">
            {formik.errors.firstName}
          </Typography>
        )}

        <FieldTitle>Last Name</FieldTitle>
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
          <Typography variant="body2" color="error">
            {formik.errors.lastName}
          </Typography>
        )}

        <FieldTitle>Date of Birth</FieldTitle>
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
          <Typography variant="body2" color="error">
            {formik.errors.dob}
          </Typography>
        )}

        <FieldTitle>Address</FieldTitle>
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
          <Typography variant="body2" color="error">
            {formik.errors.address}
          </Typography>
        )}

        <FieldTitle>Role</FieldTitle>
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
          options={[
            { value: "", label: "Select a role" },
            ...roles.map((role) => ({
              value: role,
              label: role,
            })),
          ]}
          placeholder="Select Role"
        />
        {formik.errors.role && (
          <Typography variant="body2" color="error">
            {formik.errors.role}
          </Typography>
        )}

        {selectedRole === "Cleaner" && (
          <>
            <FieldTitle>Supervisor</FieldTitle>
            <DropdownList
              name="supervisorID"
              value={formik.values.supervisorID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.supervisorID)}
              options={[
                { value: "", label: "Select a supervisor" },
                ...supervisors.map((s) => ({
                  value: s.supervisorID,
                  label: `${s.firstName} ${s.lastName}`,
                })),
              ]}
              placeholder="Select Supervisor"
              required
            />
            {formik.errors.supervisorID && (
              <Typography variant="body2" color="error">
                {formik.errors.supervisorID}
              </Typography>
            )}
          </>
        )}

        <FieldTitle>Contact Number</FieldTitle>
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
          <Typography variant="body2" color="error">
            {formik.errors.contactNumber}
          </Typography>
        )}

        <FieldTitle>Password</FieldTitle>
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
          <Typography variant="body2" color="error">
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
