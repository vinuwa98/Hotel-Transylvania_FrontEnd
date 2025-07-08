import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "../atoms/Button";
import Typography from "@mui/material/Typography";
import Input from "../atoms/Input";
import DropdownList from "../atoms/DropdownList";
import { useFormik } from "formik";
import userUpdateSchema from "../../schemas/updateSchema";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  getSupervisors,
  getUserById,
  updateUser,
} from "../../services/userService";
import { themeColors } from "../../Theme/colors";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FieldTitle = ({ children }) => (
  <Typography
    variant="subtitle1"
    sx={{ mt: 2, mb: 1, fontWeight: "bold", color: themeColors.DarkBlue }}
  >
    {children}
  </Typography>
);

const UserEditForm = ({ open, onClose, userId, onUserUpdated }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [initialFormValues, setInitialFormValues] = useState({
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    role: "",
    supervisorID: "",
    contactNumber: "",
  });

  const roles = [
    "Cleaner",
    "HelpDesk",
    "Supervisor",
    "MaintenanceStaff",
    "MaintenanceManager",
  ];

  /*

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: userUpdateSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const dataToSend = { ...values, userId };
        console.log("Formik Submit Triggered", values);

        // Remove keys with empty string
        Object.keys(dataToSend).forEach((key) => {
          if (dataToSend[key] === "") {
            delete dataToSend[key];
          }
        });

        await updateUser(userId, dataToSend, token);
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });

        onClose();
        if (onUserUpdated) {
          onUserUpdated();
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setSnackbar({
          open: true,
          message:
            "Failed to update user: " +
            (error.response?.data?.message || error.message),
          severity: "error",
        });
      }
    },
  });*/

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: userUpdateSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const dataToSend = { ...values, userId };
        console.log("Formik Submit Triggered", values);

        // Remove keys with empty string
        Object.keys(dataToSend).forEach((key) => {
          if (dataToSend[key] === "") {
            delete dataToSend[key];
          }
        });

        await updateUser(userId, dataToSend, token);
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });

        // Wait a bit to let the Snackbar show before closing modal
        setTimeout(() => {
          onClose();
          if (onUserUpdated) {
            onUserUpdated();
          }
        }, 1000); // You can adjust the delay if needed
      } catch (error) {
        console.error("Error updating user:", error);
        setSnackbar({
          open: true,
          message:
            "Failed to update user: " +
            (error.response?.data?.message || error.message),
          severity: "error",
        });
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (open && userId) {
        try {
          const token = localStorage.getItem("token");
          const userData = await getUserById(userId, token);

          const formattedDob = userData.dob
            ? new Date(userData.dob).toISOString().split("T")[0]
            : "";

          setInitialFormValues({
            userId: userData.id || "",
            email: userData.email || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            dob: formattedDob,
            address: userData.address || "",
            role: userData.role || "",
            supervisorID: userData.supervisorID || "",
            contactNumber: userData.contactNumber || "",
          });
          formik.setFieldValue("role", userData.role || "");
        } catch (error) {
          console.error("Error fetching user data for edit:", error);
          setSnackbar({
            open: true,
            message: "Failed to load user data for editing.",
            severity: "error",
          });

          onClose();
        }
      }
    };

    fetchUserData();
  }, [open, userId]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      if (open && formik.values.role === "Cleaner") {
        try {
          const token = localStorage.getItem("token");
          const data = await getSupervisors(token);
          setSupervisors(data);
        } catch (error) {
          console.error("Error fetching supervisors:", error);
        }
      }
    };

    fetchSupervisors();
  }, [open, formik.values.role]);

  const modalStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const boxStyles = {
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: "none",
    maxHeight: "90vh",
    overflowY: "auto",
  };

  return (
    <Modal open={open} onClose={onClose} sx={modalStyles}>
      <Box sx={boxStyles}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: themeColors.DarkBlue }}
        >
          Edit User
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FieldTitle>Email</FieldTitle>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.email && formik.touched.email)}
          />
          {formik.errors.email && formik.touched.email && (
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
            error={Boolean(formik.errors.firstName && formik.touched.firstName)}
          />
          {formik.errors.firstName && formik.touched.firstName && (
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
            error={Boolean(formik.errors.lastName && formik.touched.lastName)}
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <Typography variant="body2" color="error">
              {formik.errors.lastName}
            </Typography>
          )}

          <FieldTitle>Date of Birth</FieldTitle>
          <Input
            type="date"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.dob && formik.touched.dob)}
          />
          {formik.errors.dob && formik.touched.dob && (
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
            error={Boolean(formik.errors.address && formik.touched.address)}
          />
          {formik.errors.address && formik.touched.address && (
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
              if (e.target.value !== "Cleaner") {
                formik.setFieldValue("supervisorID", "");
              }
            }}
            onBlur={formik.handleBlur}
            options={[
              { value: "", label: "Select Role" },
              ...roles.map((role) => ({
                value: role,
                label: role,
              })),
            ]}
          />
          {formik.errors.role && formik.touched.role && (
            <Typography variant="body2" color="error">
              {formik.errors.role}
            </Typography>
          )}

          {formik.values.role === "Cleaner" && (
            <>
              <FieldTitle>Supervisor</FieldTitle>
              <DropdownList
                name="supervisorID"
                value={formik.values.supervisorID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={formik.values.role === "Cleaner"}
                options={[
                  { value: "", label: "Select Supervisor" },
                  ...supervisors.map((s) => ({
                    value: s.id,
                    label: `${s.firstName} ${s.lastName}`,
                  })),
                ]}
              />
              {formik.errors.supervisorID && formik.touched.supervisorID && (
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
            error={Boolean(
              formik.errors.contactNumber && formik.touched.contactNumber
            )}
          />
          {formik.errors.contactNumber && formik.touched.contactNumber && (
            <Typography variant="body2" color="error">
              {formik.errors.contactNumber}
            </Typography>
          )}

          <Box mt={4} display="flex" justifyContent="flex-end" gap={1}>
            <Button
              onClick={onClose}
              label="Cancel"
              className="bg-gray-500 text-white"
            />
            <Button
              type="submit"
              label="Update"
              className="bg-blue-600 text-white"
            />
          </Box>
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default UserEditForm;
