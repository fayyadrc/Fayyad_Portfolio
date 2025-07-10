import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await authService.login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-6 md:p-8 space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">Admin Login</h2>

        {error && (
          <div className="p-3 rounded border border-red-400 bg-red-100 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoFocus
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 text-sm font-medium"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-xs text-muted-foreground text-center mt-2">
          Check browser console for detailed errors
        </div>
      </form>
    </div>
  );
};

export default Login;
