import React from "react";
import { themeColors } from "../../Theme/colors";
import user from "../../assets/user.png";
import { useAuth } from "../../contexts/AuthContext";

const Header = ({ title }) => {
  const auth = useAuth();

  return (
    <header
      className="shadow px-6 py-4 flex items-center justify-between"
      style={{ backgroundColor: themeColors.White }}
    >
      <div className="flex items-center gap-x-3 ml-auto">
        <div className="text-right">
          <div className="text-base font-semibold text-gray-800">
            {`${auth.activeUser.firstName} ${auth.activeUser.lastName}`}
          </div>
          <div className="text-sm text-gray-500">{auth.role}</div>
        </div>
        <img
          src={user}
          alt="user"
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
