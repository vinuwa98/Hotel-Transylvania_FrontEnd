import React from 'react'
import { themeColors } from '../../Theme/colors';
//import { Home, Users, Settings } from 'lucide-react';


const Sidebar = () => (
  <aside className="w-64 shadow-md h-full hidden md:block" style={{backgroundColor: themeColors.DarkBlue}}>
    <div className="p-6 font-bold text-xl text-blue-700" style={{ color: themeColors.White }}>Hotel Transylvania</div>
    <nav className="mt-6 space-y-2">
        <a href="#" className="block px-6 py-2  hover:bg-blue-100" style={{ color: themeColors.White }}>Dashboard</a>
        <a href="#" className="block px-6 py-2  hover:bg-blue-100 rounded-md" style={{ color: themeColors.White }}>Manage Users</a>
        <a href="#" className="block px-6 py-2  hover:bg-blue-100 rounded-md" style={{ color: themeColors.White }}>Assign users</a>
        <a href="#" className="block px-6 py-2  hover:bg-blue-100 rounded-md" style={{ color: themeColors.White }}>Logout</a>
    </nav>
  </aside>
);

export default Sidebar