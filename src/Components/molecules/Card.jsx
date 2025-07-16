import React from "react";
import Button from "../atoms/Button";
import { themeColors } from "../../Theme/colors";
import { useNavigate } from "react-router-dom";

export default function Card({ title, label, path = null }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between h-full space-y-6 bg-white p-6 rounded-lg shadow m-2 text-center font-medium w-80 min-h-[160px]">
      <h2 className="text-xl">{title}</h2>

      {path ? (
        <Button
          style={{
            backgroundColor: themeColors.Blue3rd,
            color: themeColors.White,
            marginBottom: 28,
          }}
          label={label}
          onClick={() => navigate(path, { replace: false })}
        />
      ) : (
        <span className="text-3xl font-bold text-gray-700">{label}</span>
      )}
    </div>
  );
}
