// src/pages/DashboardPage.jsx
import React from 'react';
import Sidebar from '../Components/organisms/Sidebar';
import Header from '../Components/molecules/Header';
import DashboardCards from '../Components/organisms/DashboardCards';

// function DashboardPage() {
//   return (
//     <div className="p-6 text-center">
//       <h1 className="text-3xl font-bold text-green-600">Welcome to Dashboard!</h1>
//       <p className="text-gray-600 mt-4">You are logged in 🎉</p>
//     </div>
//   );
// }

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title="Admin Dashboard" />
        <main className="p-6">
          <DashboardCards />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
