import React from "react";
import Button from "../atoms/Button";
import { themeColors } from "../../Theme/colors";
import { useNavigate } from "react-router-dom";

export default function Card({ title, label, path }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between h-full space-y-6 bg-white p-6 rounded-lg shadow m-2 text-center font-medium w-80 h-35">
      <h2 className="text-xl">{title}</h2>
      <Button
        style={{
          backgroundColor: themeColors.Blue3rd,
          color: themeColors.White,
        }}
        label={label}
        onClick={() => navigate(path)}
      />
    </div>
  );
}
