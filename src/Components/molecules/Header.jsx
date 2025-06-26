import React from 'react'
import { themeColors } from '../../Theme/colors';
import user from '../../assets/user.png';

const Header = ({ title }) => (
  <header className="shadow px-6 py-4 flex items-center justify-between" style={{backgroundColor: themeColors.White}}>
    <div className="flex items-center gap-x-3 ml-auto">
      <h2 className="text-sm font-medium text-right" style={{ color: themeColors.DarkBlue}}>
         <span>Theekshani Kalpana</span>
      </h2>
      <img src={user} alt="user" className="h-10 w-10 rounded-full object-cover" />
    </div>
  </header>
);

export default Header