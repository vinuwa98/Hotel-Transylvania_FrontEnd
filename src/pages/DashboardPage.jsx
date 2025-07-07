import React from "react";
import Sidebar from "../Components/organisms/Sidebar";
import Header from "../Components/molecules/Header";
import DashboardCards from "../Components/organisms/DashboardCards";
import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const auth = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header activeUser={auth.activeUser} />
        <main className="p-6">
          <DashboardCards />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
