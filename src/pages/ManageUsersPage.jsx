// src/pages/DashboardPage.jsx
import React from 'react';
import Sidebar from '../Components/organisms/Sidebar';
import Header from '../Components/molecules/Header';
import Button from '../Components/atoms/Button';
import UserFormModal from '../Components/molecules/UserCreateForm';

const ManageUsersPage = () => {
  const [addUserModalOpen, setAddUserModalOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header/>
        <main className="p-6">
          <h1>User Management</h1>
          <UserFormModal open={addUserModalOpen} onClose={() => { setAddUserModalOpen(false)}} onSubmit={() => {}} />
          <Button label={"Add New User"} onClick={() => setAddUserModalOpen(true)} />
        </main>
      </div>
    </div>
  );
};

export default ManageUsersPage;
