import React, { useState } from "react";
import Sidebar from "../Components/organisms/Sidebar";
import Header from "../Components/molecules/Header";
import Button from "../Components/atoms/Button";
import UserFormModal from "../Components/molecules/UserCreateForm";
import ViewUsersModal from "../Components/molecules/ViewUsers";

const ManageUsersPage = () => {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [viewUsersOpen, setViewUsersOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // for edit

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setAddUserModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-row">
          <h1 className="m-2 text-xl">User Management</h1>

          {/* Single UserFormModal handles both add + edit */}
          <UserFormModal
            open={addUserModalOpen}
            onClose={() => {
              setAddUserModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
          />

          {/* View modal with edit callback */}
          <ViewUsersModal
            open={viewUsersOpen}
            onClose={() => setViewUsersOpen(false)}
            onEditUser={handleEditUser}
          />

          <div className="flex flex-col space-y-4 mt-4 w-100 ">
            <Button
              label="Add New User"
              onClick={() => {
                setAddUserModalOpen(true);
                setSelectedUser(null); // Clear form
              }}
            />
            <Button
              label="View Users"
              onClick={() => {
                setViewUsersOpen(true);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageUsersPage;
