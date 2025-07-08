import React, { useEffect, useState } from 'react';
import { themeColors } from '../../Theme/colors';
import userImage from '../../assets/user.png';
import { getLoggedUser } from '../../services/userService';

const Header = () => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await getLoggedUser(token);
        setFullName(response.fullName);
      } catch (error) {
        console.error('Error fetching logged user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header
      className="shadow px-6 py-4 flex items-center justify-between"
      style={{ backgroundColor: themeColors.White }}
    >
      <div className="flex items-center gap-x-3 ml-auto">
        <h2 className="text-sm font-medium text-right" style={{ color: themeColors.DarkBlue }}>
          {fullName ? `Welcome, ${fullName}` : 'Loading...'}
        </h2>
        <img src={userImage} alt="user" className="h-10 w-10 rounded-full object-cover" />
      </div>
    </header>
  );
};

export default Header;
