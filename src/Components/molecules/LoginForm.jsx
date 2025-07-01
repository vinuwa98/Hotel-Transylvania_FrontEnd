import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { themeColors } from '../../Theme/colors';
import authService from '../../services/authService'; // fake login service for now
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  // Input field states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Extra states for UI
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For page redirection

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setLoading(true);   // Show loading state
    setError('');       // Clear previous errors

    try {
      const user = await authService.login({ email, password });

      // Optionally store token or user info
<<<<<<< HEAD
      localStorage.setItem('token', user.token);
      localStorage.setItem('name', user.name);
      
      // Redirect to dashboard
=======
      localStorage.setItem('token', user.data.token);
      localStorage.setItem('name', user.data.name);

      // ✅ Redirect to dashboard
>>>>>>> 29a86ca19729d1222e557afeae788796d43c36f2
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email Field */}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password Field */}
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Button */}
      <Button
        label={loading ? 'Logging in...' : 'Login'}
        type="submit"
        style={{backgroundColor: themeColors.Blue3rd, color: themeColors.White}}
        className="w-full"
        disabled={loading}
      />

      <div className="text-center mt-4 text-sm text-gray-600">
        <p className="mt-2">
          <a href="/forgot-password" className="text-blue-700 hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
