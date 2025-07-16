import React from "react";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../Theme/colors";
import Button from "../atoms/Button";
import logo from "../../assets/Hotel-Maintenance-System-Logo.png";
import { LayoutDashboard, SquareChartGantt ,UserRoundPen, LogOut } from "lucide-react";
import {
  MessageCircleIcon,
  LayoutDashboard,
  UserRoundPen,
  LogOut,
  Briefcase,
  ClipboardListIcon,
  BedDoubleIcon,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClickDashboard = () => {
    navigate("/dashboard");
  };

  const handleClickManageUser = () => {
    navigate("/manage-user");
  };

  const handleClickComplaint = () => {
    navigate("/add-complaint");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleClickViewRooms = () => {
    navigate("/dashboard/rooms");
  };

  const handleClickViewComplaints = () => {
    navigate("/dashboard/complaints");
  };

  const handleClickViewJobs = () => {
    navigate("/dashboard/jobs");
  };

  return (
    <aside
      className="w-64  shadow-md h-full hidden md:flex flex-col"
      style={{ backgroundColor: themeColors.DarkBlue }}
    >
      <div className="flex flex-col items-center justify-center py-2 mt-2">
        <img
          src={logo}
          alt="Hotel Maintenance System Logo"
          className="h-40 w-40 object-contain"
        />
        <div
          className="p-4 font-bold text-xl text-center"
          style={{ color: themeColors.White }}
        >
          Hotel Maintenace System
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        <a
          // href="/dashboard"
          onClick={handleClickDashboard}
          className="flex items-center gap-3 px-6 py-2  hover:bg-blue-400 rounded-md"
          style={{ color: themeColors.White }}
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </a>
        {auth.role === "Admin" ? (
          <a
            // href="/manage-user"
            onClick={handleClickManageUser}
            className="flex items-center gap-3 px-6 py-2  hover:bg-blue-400 rounded-md"
            style={{ color: themeColors.White }}
          >
            <UserRoundPen />
            <span>Manage Users</span>
          </a>
        ) : (
          <></>
        )}

        {auth.role === "Cleaner" ? (
            <a 
              onClick={handleClickComplaint}
              className="flex items-center gap-3 px-6 py-2  hover:bg-blue-400 rounded-md"
              style={{ color: themeColors.White }}
            >
                <SquareChartGantt  />
                <span>View My Complaints</span>
            </a>
  
        ) : (
          <></>
        )}
      </nav>

      <div className="mt-auto mb-16">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-2 hover:bg-blue-400 rounded-md w-full text-left"
          style={{ color: themeColors.White }}
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
