"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAdminLogin = async () => {
    console.log('Submitting admin login data:', { email, password }); // Log form data
  
    try {
      const response = await fetch('http://localhost:8082/api/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        router.push('/admindashboard');
      } else {
        alert(result.message || 'Admin login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      alert('An error occurred during admin login. Please try again.');
    }
  };  

  const handleLogin = () => {
    router.push('/login');
  }

  return (
    <div style={{
      maxWidth: '400px', 
      margin: 'auto', 
      padding: '20px', 
      backgroundColor: 'white',
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <h1 className="text-4xl font-bold text-black mb-10">Admin Login</h1>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button onClick={handleLogin} 
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Back
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
      <button onClick={handleAdminLogin} 
      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Admin Login
      </button>
    </div>
  );
};

export default AdminLoginPage;
