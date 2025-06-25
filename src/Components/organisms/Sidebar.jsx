import React from 'react'
//import { Home, Users, Settings } from 'lucide-react';

const Sidebar = () => (
  <aside className="w-64 bg-white shadow-md h-full hidden md:block">
    <div className="p-6 font-bold text-xl text-blue-700">Hotel Admin</div>
    {/* <nav className="mt-6 space-y-2">
      <a href="#" className="block px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-md"><Home className="inline mr-2" />Dashboard</a>
      <a href="#" className="block px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-md"><Users className="inline mr-2" />Staff</a>
      <a href="#" className="block px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-md"><Settings className="inline mr-2" />Settings</a>
    </nav> */}
  </aside>
);


export default Sidebar