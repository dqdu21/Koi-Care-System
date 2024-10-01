import React, { useState } from 'react';
import { Divider, Input, Radio } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext'; 

interface LoginResponse {
  token?: string;
  message?: string;
}

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        'https://fall2024swd392-se1704-group1.onrender.com/account/login',
        { email, password },
        { 
          headers: { 'Content-Type': 'application/json' },
          validateStatus: () => true
        }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        login(); // Update global auth state
        navigate('/'); // Redirect to homepage
      } else {
        setError(response.data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Đăng nhập thất bại: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra kết nối mạng của bạn.');
      }
    }
  };


  return (
    <div className="p-8 bg-slate-200 rounded-lg">
      <h2 className="font-bold text-2xl text-center mb-5">Welcome Back</h2>
      <p className="font-light text-base text-center mb-8">Login To Your FKoi Account!</p>
      
      <form onSubmit={handleSignIn}>
        <div className="flex items-center justify-center cursor-pointer bg-green-400 my-4">
          <i className="fa-brands fa-google"></i>
          <p className="ml-3">Continue with Google</p>
        </div>

        <Input
          className="my-4 text-sm"
          size="large"
          placeholder="Email address"
          prefix={<i className="fa-solid fa-envelope"></i>}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          className="my-4 text-sm"
          size="large"
          placeholder="Password"
          prefix={<i className="fa-solid fa-key"></i>}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Radio className="mb-4">Remember me</Radio>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          className="my-4 w-full bg-amber-500 px-4 py-2 rounded-md hover:bg-stone-900 hover:text-white"
        >
          Sign In
        </button>
      </form>

      <p className="text-center">
        Or{' '}
        <a href="#" className="text-amber-500 hover:underline">
          Forgot password
        </a>
        .
      </p>
      
      <Divider />
      
      <p className="text-center text-sm">
        Don't have an account?{' '}
        <a className="text-amber-500 hover:underline" href="sign-up">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SigninPage;