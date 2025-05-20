// Login.js (Updated)
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4500/auth/Login', form);
      
      // Store both token and email in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userEmail', res.data.user.email);
      localStorage.setItem('firstName', res.data.user.firstName);

      if(res?.data?.user?.email === "admin12@gmail.com") {
        navigate('/AdminMainPage');
      } else {
        navigate('/Home');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>

      <div className="links">
        <a href="/ForgotPassword">Forgot Password?</a>
        <span> | </span>
        <a href="/register">Create an Account</a>
      </div>
    </div>
  );
}

export default Login;