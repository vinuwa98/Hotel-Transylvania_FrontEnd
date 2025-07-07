import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/organisms/Sidebar';
import Header from '../Components/molecules/Header';
import Button from '../Components/atoms/Button';
import UserCreateForm from '../Components/molecules/UserCreateForm';// MODIFICATION: Corrected import name from UserFormModal to UserCreateForm
import UserEditForm from '../Components/organisms/UserEditForm';// MODIFICATION: Import UserEditForm
import { themeColors } from '../Theme/colors';
import Modal from '../Components/molecules/modal';
import { Ban, ShieldCheck } from 'lucide-react';
import { fetchUsers, deactivateUser, activateUser, addUser } from '../services/userService';





const ManageUsersPage = () => {

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // MODIFICATION: Changed to use state for confirmAction
const [confirmMessage, setConfirmMessage] = useState(""); // Optional but also needed
const [confirmIcon, setConfirmIcon] = useState(null);     // Optional for icon
  const [editUserModalOpen, setEditUserModalOpen] = useState(false); // ADDITION: New state for edit modal
  const [currentEditingUserId, setCurrentEditingUserId] = useState(null); // ADDITION: New state to store ID of user being edited
  const [users, setUsers] = useState([]);

  
  // Function to load users - encapsulate to call it easily after updates
  const loadUsers = async () => { // MODIFICATION: Encapsulated loadUsers inside a function
    try {
      const token = localStorage.getItem('token');
      const usersData = await fetchUsers(token);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Optionally show a user-friendly error message
    }
  };

  useEffect(() => {
    loadUsers();
  }, []); // Load users once on component mount

  // Handle opening the Add User modal
  const handleAddUserClick = () => {
    setAddUserModalOpen(true);
  };

  // Handle closing the Add User modal
  const handleCloseAddUserModal = () => {
    setAddUserModalOpen(false);
    loadUsers(); // Refresh user list after adding
  };

  // ADDITION: Handle opening the Edit User modal
  const handleEditClick = (userId) => {
    setCurrentEditingUserId(userId);
    setEditUserModalOpen(true);
  };

  // ADDITION: Handle closing the Edit User modal
  const handleCloseEditUserModal = () => {
    setEditUserModalOpen(false);
    setCurrentEditingUserId(null); // Clear the editing user ID
    loadUsers(); // Refresh user list after editing
  };

  // ADDITION: Handle Add User submission from UserCreateForm (moved from being inline)
  const handleAddUserSubmit = async ({ form, token }) => {
    try {
      await addUser(form, token); // Assuming addUser function exists in userService
      alert("User added successfully!");
      handleCloseAddUserModal(); // Close and refresh
    } catch (error) {
      console.error('Error adding user:', error);
      alert("Failed to add user: " + (error.message || "Unknown error"));
    }
  };


  // Deactivate the users
  const handleDeactivate = async (userId, currentStatus) => {

    const isDeactivating = currentStatus === "Active";

    // Set the confirm message based on the action
    setConfirmMessage(
      isDeactivating
        ? "Are you sure you want to deactivate this user?"
        : "Are you sure you want to activate this user?"
    );

    // Set the confirm icon based on the action
    setConfirmIcon
    (
      isDeactivating ? (
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          style={{
            backgroundColor: themeColors.Red,
          }}
        >
          <Ban className="w-8 h-8" style={{color:themeColors.White}}/>
        </div>
      ) : (
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
          style={{
            backgroundColor: themeColors.Green,
          }}
        >
          <ShieldCheck className="w-8 h-8" style={{color:themeColors.White}}/>
        </div>
      )
    );
    
    // Set the confirm action based on the action
    setConfirmAction(() => async () =>
    {
        try 
        {
          const token = localStorage.getItem('token');

          if (isDeactivating) 
          {
            await deactivateUser(userId, token);
          } 
          else 
          {
            await activateUser(userId, token);
          }

          const updatedUsers = await fetchUsers(token);
          setUsers(updatedUsers);
        } 
        catch (error) 
        {
          console.error("Failed to update user status:", error);
        } 
        finally 
        {
          setConfirmModalOpen(false);
        }
    });

    // Open the confirmation modal
    setConfirmModalOpen(true);

}; 

  return (
    <div className="flex h-screen" style={{ backgroundColor: themeColors.Gray }}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Manage Users</h2>
          <UserCreateForm open={addUserModalOpen} onClose={() => setAddUserModalOpen(false)} onSubmit={() => {}} />
          <UserCreateForm
            open={addUserModalOpen}
            onClose={() => setAddUserModalOpen(false)}
            handleSubmit={async (data) => await addUser(data.form, data.token)}
          />
          <Button 
            label={"Add New User"} 
            onClick={() => setAddUserModalOpen(true)} 
            style={{backgroundColor: themeColors.Blue3rd, color: themeColors.White}}
            className="w-fit px-4 py-2 rounded-md mb-4 hover:opacity-90 transition"
          />

          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full text-12 text-center border-collapse">
              <thead style={{ backgroundColor: themeColors.DarkBlue, color: themeColors.White }}>
                <tr>
                  <th className="px-6 py-3 font-medium">Full Name</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Address</th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={`text-center`}
                  >
                    <td className="px-6 py-4">{user.fullName}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.address}</td>
                    <td className="px-6 py-4">{user.contactNumber}</td>
                    <td className="px-6 py-4">

                      <span
                        style={{ 
                          backgroundColor: user.status === 'Active' 
                              ? themeColors.LightGreen 
                              : themeColors.LightRed,

                          color: user.status === 'Active' 
                              ? themeColors.Green 
                              : themeColors.Red 
                        }}
                        
                        className={`px-4 py-2 rounded-lg text-12 font-medium`}
                      >
                        {user.status}
                      </span>
                      

                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <Button
                          label={'Edit'}
                          className="w-24"
                          onClick={() => handleEditClick(user.id)} // <-- This is the important line!
                          style={{
                            backgroundColor: themeColors.Green,
                            color: themeColors.White,
                          }}
                        />
                        <Button
                          label={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                          className="w-24"
                          onClick={() => handleDeactivate(user.id, user.status)}
                          style={{
                            backgroundColor:
                              user.status === 'Active'
                                ? themeColors.Red
                                : themeColors.LightBlue,
                            color: 
                                themeColors.White,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td 
                    className="px-6 py-4 text-center" colSpan="6"
                    style={{ color: themeColors.Gray500 }}
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Confirmation Modal */}
        <Modal
          isOpen={confirmModalOpen} 
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={confirmAction}
          message={confirmMessage}
          icon={confirmIcon}
        />
      </div>


      {/* User Create Modal */}
      <UserCreateForm
        open={addUserModalOpen}
        onClose={handleCloseAddUserModal}
        handleSubmit={handleAddUserSubmit} // MODIFICATION: Pass the new handleAddUserSubmit
      />

      {/* ADDITION: User Edit Modal */}
      <UserEditForm
        open={editUserModalOpen}
        onClose={handleCloseEditUserModal}
        userId={currentEditingUserId} // Pass the ID of the user to edit
        onUserUpdated={loadUsers} // Call loadUsers to refresh table after update
      />
    </div>
  );
};

export default ManageUsersPage;
