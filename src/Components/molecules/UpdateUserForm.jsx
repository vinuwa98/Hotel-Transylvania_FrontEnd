import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Input from "../atoms/Input";
import axios from "axios";

const roles = [
  "Cleaner",
  "HelpDesk",
  "Supervisor",
  "MaintenanceStaff",
  "MaintenanceManager",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function UserFormModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    supervisorID: "",
    contactNumber: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (user) {
        // UPDATE mode
        const updateDto = {
          userId: user.userId, // make sure this comes from props
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          dob: form.dob,
          address: form.address,
          contactNumber: form.contactNumber,
          role: form.role,
          supervisorID: form.supervisorID,
          password: form.password || "Temp@123", // Optional: Handle if not updating password
        };

        await axios.put(
          "https://localhost:7172/api/account/update-user",
          updateDto,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("User updated successfully");
      } else {
        // ADD mode
        await axios.post("https://localhost:7172/api/account/add-user", form, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User added successfully");
      }

      onClose(); // close modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          Add User
        </Typography>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="supervisorID"
          placeholder="Supervisor ID"
          value={form.supervisorID}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
