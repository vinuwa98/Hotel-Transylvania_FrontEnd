import React from "react";
import ResetPasswordSection from "../Components/organisms/ResetPasswordSection";
import loginImage from "../assets/login1.png";
import { themeColors } from "../Theme/colors";

function ResetPasswordPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{ backgroundColor: themeColors.White }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center bg-blue-300 shadow-lg rounded-lg overflow-hidden max-w-5xl w-full h-[80vh]">
        {/* Left side image */}
        <div className="hidden md:flex w-1/2 h-full">
          <img
            src={loginImage}
            alt="Reset Password Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side reset form */}
        <div className="w-full md:w-1/2 px-6 py-8">
          <ResetPasswordSection />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
