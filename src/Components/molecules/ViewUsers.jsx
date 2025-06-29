import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

export default function ViewAllUsersModal({ open, onClose, onEditUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEdit = (user) => {
    onEditUser(user); // Send user to parent
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      axios
        .get("https://localhost:7172/api/account/all-users")
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch users:", error);
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          All Users
        </Typography>

        {loading ? (
          <Typography>Loading users...</Typography>
        ) : users.length === 0 ? (
          <Typography>No users found.</Typography>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">First Name</th>
                <th align="left">Last Name</th>
                <th align="left">Email</th>
                <th align="left">Role</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        onEditUser(user); // This triggers edit in ManageUsersPage
                        onClose(); // Optional: close view modal after clicking edit
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Box mt={3} textAlign="right">
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}
