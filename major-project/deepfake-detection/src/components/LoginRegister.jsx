import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import Notification from './Notification'; // Import the notification component

const LoginRegister = () => {
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState(''); // State for displaying the message

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    axios.post('http://localhost:5000/register', formData)
      .then(response => {
        console.log(response.data);
        setMessage('Registration successful!'); // Set success message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => {
        console.error('There was an error registering!', error);
        setMessage('Registration failed. Please try again.'); // Set error message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      });
  };

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', formData)
      .then(response => {
        console.log(response.data);
        setMessage('Login successful!'); // Set success message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        setMessage('Login failed. Please try again.'); // Set error message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      });
  };

  return (
    <div className={`wrapper ${action}`}>
      <Notification message={message} /> {/* Add Notification component */}
      <div className='form-box login'>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type="text" name="username" placeholder='Username' required onChange={handleInputChange} />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type="password" name="password" placeholder='Password' required onChange={handleInputChange} />
            <FaLock className='icon' />
          </div>
          <button type='submit'>Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="#" onClick={() => setAction('active')}>Register</a></p>
          </div>
        </form>
      </div>
      <div className='form-box register'>
        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
          <h1>Registration</h1>
          <div className='input-box'>
            <input type="text" name="username" placeholder='Username' required onChange={handleInputChange} />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type="email" name="email" placeholder='Email' required onChange={handleInputChange} />
            <FaEnvelope className='icon' />
          </div>
          <div className='input-box'>
            <input type="password" name="password" placeholder='Password' required onChange={handleInputChange} />
            <FaLock className='icon' />
          </div>
          <button type='submit'>Register</button>
          <div className="register-link">
            <p>Already have an account? <a href="#" onClick={() => setAction('')}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
