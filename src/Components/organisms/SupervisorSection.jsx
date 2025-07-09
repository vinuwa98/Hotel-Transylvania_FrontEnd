import React from "react";
import Sidebar from "./Sidebar";
import Header from "../molecules/Header";
import SupervisorComplaintTable from "./SupervisorComplaintTable";

const SupervisorSection = () => {
  return (
    <div className="flex">
      <div className="flex-1">  
        <SupervisorComplaintTable />
      </div>
    </div>
  );
};

export default SupervisorSection;
