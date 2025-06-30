import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/organisms/Sidebar';
import Header from '../Components/molecules/Header';
import Button from '../Components/atoms/Button';
import UserFormModal from '../Components/molecules/UserCreateForm';
import { themeColors } from '../Theme/colors';
import { fetchUsers, deactivateUser  } from '../services/userService';

const ManageUsersPage = () => {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersData = await fetchUsers(token);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, []);


  // deactivate part
  const handleDeactivate = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    await deactivateUser(userId, token);
    // Refresh the user list
    const updatedUsers = await fetchUsers(token);
    setUsers(updatedUsers);
  } catch (error) {
    console.error("Failed to deactivate user:", error);
  }
}; 

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-4">
          <h2 className="text-4xl font-bold mb-4">Manage Users</h2>
          <UserFormModal open={addUserModalOpen} onClose={() => setAddUserModalOpen(false)} onSubmit={() => {}} />
          <Button 
            label={"Add New User"} 
            onClick={() => setAddUserModalOpen(true)} 
            style={{backgroundColor: themeColors.Blue3rd, color: themeColors.White}}
            className="w-fit px-4 py-2"
          />

          <table className="min-w-full border mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{user.fullName}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <td className="border px-4 py-2">{user.contactNumber}</td>
                  <td className="border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2 justify-center">
                      <Button 
                          label={"Edit"} 
                          style={{backgroundColor: themeColors.Green, color: themeColors.White}}
                      />
                      <Button 
                        label={"Deactivate"} 
                        style={{backgroundColor: themeColors.Red, color: themeColors.White}}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="6">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
