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
    router.push('/adminlogin');
  };

  const handleAnalystLogin = () => {
    router.push('/analystlogin');
  }

  return (
    <div style={{
      maxWidth: '400px', 
      margin: 'auto', 
      padding: '10px', 
      backgroundColor: 'white',
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
    
      <h1 className="text-4xl font-bold text-black mb-10">SPEED Login</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={handleAdminLogin} 
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Admin Login
        </button>
        <button onClick={handleAnalystLogin}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Analyst Login
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
      <div style={{ display: 'flex', gap: '200px' }}>
        <button onClick={handleLogin} 
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Login
        </button>
        <button onClick={() => router.push('/register')}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
