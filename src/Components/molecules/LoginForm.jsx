import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import authService from '../../services/authService'; // fake login service for now
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  // ✅ Input field states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Extra states for UI
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For page redirection

  // ✅ Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setLoading(true);   // Show loading state
    setError('');       // Clear previous errors

    try {
      const user = await authService.login({ email, password });

      // ✅ Optionally store token or user info
      localStorage.setItem('token', user.token);
      localStorage.setItem('name', user.name);

      // ✅ Redirect to dashboard
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
        disabled={loading}
      />
    </form>
  );
}

export default LoginForm;
