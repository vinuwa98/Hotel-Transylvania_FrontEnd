import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// ✅ CORRECT
import Button from "../atoms/Button";
import Typography from "@mui/material/Typography";
import Input from "../atoms/Input";
import DropdownList from "../atoms/DropdownList";
import { useFormik } from "formik";
import userSchema from "../../schemas/userSchema"; // Assuming you have a userSchema for validation
import { getSupervisors, getUserById, updateUser } from "../../services/userService"; // Import the new service functions
import { DropdownOption } from "../atoms/DropDownOption"; // Corrected import path/name if necessary
import { themeColors } from "../../Theme/colors"; // Assuming you have themeColors for styling


const FieldTitle = ({ children }) => (
  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: themeColors.DarkBlue }}>
    {children}
  </Typography>
);

const UserEditForm = ({ open, onClose, userId, onUserUpdated }) => {
  const [supervisors, setSupervisors] = useState([]);
  const [initialFormValues, setInitialFormValues] = useState({
    userId: "", // Will be populated from props
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    role: "",
    supervisorID: "",
    contactNumber: "",
    password: "", // Password might be handled differently (e.g., reset, not directly edited)
  });

  const roles = [
    "Cleaner",
    "HelpDesk",
    "Supervisor",
    "MaintenanceStaff",
    "MaintenanceManager",
  ];

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: userSchema,
    enableReinitialize: true, // This is crucial to update form with new initial values
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        // Ensure that userId is always passed for the update
        const dataToSend = { ...values, userId: userId };

        await updateUser(userId, dataToSend, token);
        alert("User updated successfully!");
        onClose(); // Close modal on success
        if (onUserUpdated) {
          onUserUpdated(); // Refresh user list in ManageUsersPage
        }
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user: " + (error.response?.data || error.message));
      }
    },
  });

  useEffect(() => {
    // Fetch user details when the modal opens or userId changes
    const fetchUserData = async () => {
      if (open && userId) {
        try {
          const token = localStorage.getItem("token");
          const userData = await getUserById(userId, token);

          // Format DOB for input field if necessary (YYYY-MM-DD)
          const formattedDob = userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : "";

          // Set initial values for the form, including the fetched user data
          setInitialFormValues({
            userId: userData.id || "",
            email: userData.email || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            dob: formattedDob,
            address: userData.address || "",
            role: userData.role || "",
            supervisorID: userData.supervisorID || "", // Make sure your DTO includes this if applicable
            contactNumber: userData.contactNumber || "",
            password: "", // Do not pre-fill password for security reasons
          });
          formik.setFieldValue("role", userData.role || ""); // Explicitly set role for dropdown
        } catch (error) {
          console.error("Error fetching user data for edit:", error);
          alert("Failed to load user data for editing.");
          onClose(); // Close modal if data cannot be fetched
        }
      }
    };

    fetchUserData();
  }, [open, userId]); // Dependency array: run when 'open' or 'userId' changes

  useEffect(() => {
  const fetchSupervisors = async () => {
    if (open && formik.values.role === "Cleaner") {
      try {
        const token = localStorage.getItem("token");
        const data = await getSupervisors(token);
        setSupervisors(data); //
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    }
  };

  fetchSupervisors();
}, [open, formik.values.role]); // Run when modal opens or role changes


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
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: themeColors.DarkBlue }}>
          Edit User
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FieldTitle>Email</FieldTitle>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.email && formik.touched.email)}
            required
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
            required
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
            required
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
            required
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
              // Reset supervisorID if role changes from Cleaner
              if (e.target.value !== "Cleaner") {
                formik.setFieldValue("supervisorID", "");
              }
            }}
            onBlur={formik.handleBlur}
            required
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
                    label: `${s.firstName} ${s.lastName}`, // 👈 change this!
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
            error={Boolean(formik.errors.contactNumber && formik.touched.contactNumber)}
            required
          />
          {formik.errors.contactNumber && formik.touched.contactNumber && (
            <Typography variant="body2" color="error">
              {formik.errors.contactNumber}
            </Typography>
          )}

          {/* Password field - typically, you might handle password resets separately
              or have it as an optional field for update.
              For simplicity, I'm including it as required based on your schema.
              Consider if you truly want to require password on every edit. */}
          <FieldTitle>Password</FieldTitle>
          <Input
            type="password"
            name="password"
            placeholder="Password (Leave blank to keep current)"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.password && formik.touched.password)}
          />
          {formik.errors.password && formik.touched.password && (
            <Typography variant="body2" color="error">
              {formik.errors.password}
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
                disabled={!formik.isValid || !formik.dirty} // Disable if form is not valid or unchanged
            />
            </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserEditForm;