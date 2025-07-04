import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { themeColors } from "../../Theme/colors";
import authService from "../../services/authService";
import { useSearchParams } from "react-router-dom";

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPassword({
        email,
        token,
        newPassword: password,
      });
      setMessage("Password reset successful! You can now log in.");
    } catch (err) {
      setError(err.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <Input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Confirm new password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-green-600 text-sm">{message}</p>}

      <Button
        label={loading ? "Resetting..." : "Reset Password"}
        type="submit"
        style={{
          backgroundColor: themeColors.Blue3rd,
          color: themeColors.White,
        }}
        className="w-full"
        disabled={loading}
      />
    </form>
  );
}

export default ResetPasswordForm;
