import React from "react";
import ResetPasswordForm from "../molecules/ResetPassworfForm";

function ResetPasswordSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPasswordSection;
