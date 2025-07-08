import React, { useEffect, useState } from 'react';
import Button from '../Components/atoms/Button';
import UserFormModal from '../Components/molecules/UserCreateForm';
import { themeColors } from '../Theme/colors';
import Modal from '../Components/molecules/modal';
import { Ban, ShieldCheck } from 'lucide-react';
import { fetchUsers, deactivateUser, activateUser, addUser } from '../services/userService';


const ManageUsersPage = () => {

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
 
  // State for confirmation modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [confirmIcon, setConfirmIcon] = useState(null);


  useEffect(() => {
    const loadUsers = async () => {
      try 
      {
        const token = localStorage.getItem('token');
        const usersData = await fetchUsers(token);
        setUsers(usersData);
      } 
      catch (error) 
      {
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, []);

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
     
      <div className="flex flex-col flex-1">
      
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>
          <UserFormModal open={addUserModalOpen} onClose={() => setAddUserModalOpen(false)} onSubmit={() => {}} />
          <UserFormModal
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
    </div>
  );
};

export default ManageUsersPage;
