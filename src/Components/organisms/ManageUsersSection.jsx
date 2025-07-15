import React, { useEffect, useState } from "react";
import Sidebar from "../organisms/Sidebar";
import Header from "../molecules/Header";
import Button from "../atoms/Button";
import UserCreateForm from "../molecules/UserCreateForm";
import UserEditForm from "../organisms/UserEditForm";
import { themeColors } from "../../Theme/colors";
import Modal from "../molecules/Modal";
import Table from "../organisms/Table/Table";
import {
  fetchUsers,
  deactivateUser,
  activateUser,
  addUser,
} from "../../services/userService";
import UserFormModal from "../molecules/UserCreateForm";
import { Ban, ShieldCheck, XCircle, CheckCircle } from "lucide-react";

const ManageUsersPage = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmIcon, setConfirmIcon] = useState(null);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [currentEditingUserId, setCurrentEditingUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [confirmMessageType, setConfirmMessageType] = useState("confirm");

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const usersData = await fetchUsers(token);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const columns = [
    { header: "Full Name", accessor: "fullName" },

    { header: "Role", accessor: "role" },
    {
      header: "Address",
      renderCell: (user) => user.address || "",
    },
    { header: "Contact", accessor: "contactNumber" },
    {
      header: "Status",
      renderCell: (user) => (
        <span
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            backgroundColor:
              user.status === "Active"
                ? themeColors.LightGreen
                : themeColors.LightRed,
            color:
              user.status === "Active" ? themeColors.Green : themeColors.Red,
          }}
        >
          {user.status || "Unknown"}
        </span>
      ),
    },
    {
      header: "Actions",
      renderCell: (user) => (
        <div className="flex gap-2 justify-center">
          <Button
            label="Edit"
            className="w-20"
            onClick={() => handleEditClick(user.id)}
            style={{
              backgroundColor: themeColors.Green,
              color: themeColors.White,
            }}
          />
          <Button
            label={user.status === "Active" ? "Deactivate" : "Activate"}
            className="w-24"
            onClick={() => handleDeactivate(user.id, user.status)}
            style={{
              backgroundColor:
                user.status === "Active"
                  ? themeColors.Red
                  : themeColors.LightBlue,
              color: themeColors.White,
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  // Add a new user with feedback
  const handleAddUserSubmit = async (data) => {
    try {
      await addUser(data.form, data.token);

      setConfirmMessage("User added successfully!");
      setConfirmIcon(
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: themeColors.Green }}
        >
          <CheckCircle
            className="w-8 h-8"
            style={{ color: themeColors.White }}
          />
        </div>
      );
      setConfirmMessageType("information");
      setConfirmAction(null); //
      setAddUserModalOpen(false);
      setConfirmModalOpen(true);

      setTimeout(() => {
        setConfirmModalOpen(false);
      }, 3000);

      loadUsers(); //
    } catch (error) {
      setConfirmMessage(`User not added: ${error.message}`);
      setConfirmIcon(
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: themeColors.Red }}
        >
          <XCircle className="w-8 h-8" style={{ color: themeColors.White }} />
        </div>
      );
      setConfirmMessageType("information");
      setConfirmAction(null);
      setConfirmModalOpen(true);
    }
  };

  const handleAddUserClick = () => {
    setAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setAddUserModalOpen(false);
    loadUsers();
  };

  const handleEditClick = (userId) => {
    setCurrentEditingUserId(userId);
    setEditUserModalOpen(true);
  };

  const handleCloseEditUserModal = () => {
    setEditUserModalOpen(false);
    setCurrentEditingUserId(null);
    loadUsers();
  };

  const handleDeactivate = async (userId, currentStatus) => {
    const isDeactivating = currentStatus === "Active";

    setConfirmMessage(
      isDeactivating
        ? "Are you sure you want to deactivate this user?"
        : "Are you sure you want to activate this user?"
    );

    setConfirmIcon(
      isDeactivating ? (
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          style={{
            backgroundColor: themeColors.Red,
          }}
        >
          <Ban className="w-8 h-8" style={{ color: themeColors.White }} />
        </div>
      ) : (
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          style={{
            backgroundColor: themeColors.Green,
          }}
        >
          <ShieldCheck
            className="w-8 h-8"
            style={{ color: themeColors.White }}
          />
        </div>
      )
    );

    setConfirmAction(() => async () => {
      try {
        const token = localStorage.getItem("token");

        if (isDeactivating) {
          await deactivateUser(userId, token);
        } else {
          await activateUser(userId, token);
        }

        const updatedUsers = await fetchUsers(token);
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Failed to update user status:", error);
      } finally {
        setConfirmModalOpen(false);
      }
    });

    setConfirmModalOpen(true);
  };

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: themeColors.Gray }}
    >
      <div className="flex flex-col flex-1">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>
          <Button
            label={"Add New User"}
            onClick={() => setAddUserModalOpen(true)}
            style={{
              backgroundColor: themeColors.Blue3rd,
              color: themeColors.White,
            }}
            className="w-fit px-4 py-2 rounded-md mb-4 hover:opacity-90 transition"
          />

          <div className="w-full overflow-x-auto shadow-lg rounded-lg">
            <Table columns={columns} data={users} />
          </div>
        </div>

        {/* Confirmation Modal */}
        <Modal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={confirmAction}
          message={confirmMessage}
          icon={confirmIcon}
          messageType={confirmMessageType}
        />
      </div>

      {/* User Create Modal */}
      {/* <UserCreateForm
        open={addUserModalOpen}
        onClose={handleCloseAddUserModal}
        handleSubmit={handleAddUserSubmit} 
      /> */}
      <UserFormModal
        open={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        handleSubmit={handleAddUserSubmit}
      />

      {/* ADDITION: User Edit Modal */}
      <UserEditForm
        open={editUserModalOpen}
        onClose={handleCloseEditUserModal}
        userId={currentEditingUserId}
        onUserUpdated={loadUsers}
      />
    </div>
  );
};

export default ManageUsersPage;
