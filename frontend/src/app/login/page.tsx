"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Redirect to user dashboard if login is successful
        router.push('/userdashboard');
      } else {
        // Show an error message if login fails
        alert(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleAdminLogin = () => {
    // Redirect to /adminlogin.tsx for admin login
    router.push('/adminlogin');
  };

  return (
    <div style={{
      maxWidth: '400px', 
      margin: 'auto', 
      padding: '20px', 
      backgroundColor: '#f0f0f0',
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <h1>SPEED Login</h1>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button onClick={handleAdminLogin} style={{ padding: '10px 20px' }}>
          Admin Login
        </button>
      </div>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            color: 'black', 
            backgroundColor: 'white', 
            border: '1px solid #ccc' 
          }}
        />
      </div>
      <div style={{ marginBottom: '10px', width: '100%' }}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            color: 'black', 
            backgroundColor: 'white', 
            border: '1px solid #ccc' 
          }}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleLogin} style={{ padding: '10px 20px', marginRight: '10px' }}>
          Login
        </button>
        <button onClick={() => router.push('/register')} style={{ padding: '10px 20px', marginTop: '10px' }}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
