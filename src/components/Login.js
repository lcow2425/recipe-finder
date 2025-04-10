import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Welcome</h2>
      <button className="btn btn-primary" onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;