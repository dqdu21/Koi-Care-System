import React, { useState } from 'react';
import { Input, Divider } from 'antd';
import axios from 'axios';

interface SignUpResponse {
  token: string;
}

const FormSignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Mật khẩu và mật khẩu xác nhận không khớp');
      return;
    }

    try {
      const response = await axios.post<SignUpResponse>('https://fall2024swd392-se1704-group1.onrender.com/api/signup', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Lưu token hoặc thực hiện các hành động khác khi đăng ký thành công
        localStorage.setItem('token', response.data.token);
        alert('Đăng ký thành công!');
      }
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="p-8 bg-slate-200 rounded-lg">
      <h2 className="font-bold text-2xl text-center mb-5">Create an Account</h2>
      <p className="font-light text-base text-center mb-8">Sign Up for FKoi!</p>

      <form onSubmit={handleSignUp}>
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
        <Input.Password
          className="my-4 text-sm"
          size="large"
          placeholder="Confirm Password"
          prefix={<i className="fa-solid fa-key"></i>}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          className="my-4 w-full bg-amber-500 px-4 py-2 rounded-md hover:bg-stone-900 hover:text-white"
        >
          Sign Up
        </button>
      </form>

      <Divider />

      <p className="text-center text-sm">
        Already have an account?{' '}
        <a className="text-amber-500 hover:underline" href="#">
          Log In
        </a>
      </p>
    </div>
  );
};

export default FormSignUp;
