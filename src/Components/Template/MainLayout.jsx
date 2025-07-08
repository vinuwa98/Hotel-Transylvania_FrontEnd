import React from 'react'
import { themeColors } from '../../Theme/colors';
import Sidebar from '../organisms/Sidebar';
import Header from '../molecules/Header';
import { Outlet } from 'react-router-dom';

const MainLaout = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: themeColors.Gray }}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6" style={{ backgroundColor: themeColors.LightGray }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}


export default MainLaout;