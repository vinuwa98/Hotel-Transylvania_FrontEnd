// D:\HotelMaintenance\Hotel-Transylvania_FrontEnd\src\Components\molecules\Modal.jsx

import React from "react";
import Button from "../atoms/Button";
import { themeColors } from "../../Theme/colors";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  icon,
  messageType = "confirm",
  backdrop = true, // NEW: control background dimming
}) => {
  if (!isOpen) return null;

  const renderButtons = () => {
    if (messageType === "confirm") {
      return (
        <>
          <Button
            label="Yes"
            onClick={onConfirm}
            style={{
              backgroundColor: themeColors.Blue3rd,
              color: themeColors.White,
            }}
            className="px-4 py-2 rounded"
          />
          <Button
            label="No"
            onClick={onClose}
            style={{
              backgroundColor: themeColors.Gray500,
              color: themeColors.White,
            }}
            className="px-4 py-2 rounded"
          />
        </>
      );
    } else {
      return (
        <Button
          label="OK"
          onClick={onClose}
          style={{
            backgroundColor: themeColors.Blue3rd,
            color: themeColors.White,
          }}
          className="px-4 py-2 rounded"
        />
      );
    }
  };

  return (
    <div
      className={`${
        backdrop
          ? "fixed inset-0 bg-black bg-opacity-50"
          : "absolute inset-0 bg-transparent"
      } flex items-center justify-center z-50`}
    >
      <div
        className="p-6 rounded-lg shadow-md max-w-sm w-full text-center"
        style={{ backgroundColor: themeColors.Gray }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: themeColors.DarkBlue }}
        >
          {messageType === "confirm" ? "Confirmation" : "Information"}
        </h2>

        <p className="text-lg font-medium mb-8 leading-relaxed">{message}</p>

        {/* Optional icon rendering */}
        {icon && <div className="flex justify-center mb-12 text-4xl">{icon}</div>}

        <div className="flex justify-center gap-8">{renderButtons()}</div>
      </div>
    </div>
  );
};

export default Modal;
