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
    
    console.log('Attempting login with:', { email, password: '***' });
    
    try {
      const result = await authService.login(email, password);
      console.log('Login successful:', result);
      navigate('/admin');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err?.message || 'Login failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl shadow p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="input w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="input w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Check browser console for detailed error messages
        </div>
      </form>
    </div>
  );
};

export default Login; 