import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Small delay gives Firebase Auth background processes time to complete
      // before the component unmounts, avoiding "The user aborted a request" errors.
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 300);
    } catch (err) {
      console.error("Login Error:", err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <div className="admin-login-particles">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="admin-particle" style={{ '--i': i }} />
          ))}
        </div>
      </div>

      <div className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-brand-icon">
            <i className="fas fa-om" />
          </div>
          <div className="admin-brand-text">
            <h1>Dongri Cha Raja</h1>
            <span>Admin Control Panel</span>
          </div>
        </div>

        <div className="admin-login-divider" />

        <h2 className="admin-login-title">Welcome Back</h2>
        <p className="admin-login-subtitle">Enter your administrator credentials to continue</p>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-email">
              <i className="fas fa-envelope" /> Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              autoFocus
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">
              <i className="fas fa-lock" /> Password
            </label>
            <div className="admin-password-wrapper">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                className="admin-toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-error-msg">
              <i className="fas fa-circle-exclamation" /> {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <><i className="fas fa-spinner fa-spin" /> Verifying...</>
            ) : (
              <><i className="fas fa-sign-in-alt" /> Sign In to Dashboard</>
            )}
          </button>
        </form>

        <p className="admin-login-footer">
          <i className="fas fa-shield-halved" /> Secure administrator access only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
