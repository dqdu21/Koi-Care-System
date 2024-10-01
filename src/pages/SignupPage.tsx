import { Divider, Input, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://fall2024swd392-se1704-group1.onrender.com/account/register', 
        { email, password },
        { 
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        message.success('Signup successful!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      message.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        />
        <Input.Password
          className="my-4 text-sm"
          size="large"
          placeholder="Password"
          prefix={<i className="fa-solid fa-key"></i>}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <Input.Password
          className="my-4 text-sm"
          size="large"
          placeholder="Confirm Password"
          prefix={<i className="fa-solid fa-key"></i>}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />

        <button
          type="submit"
          className="my-4 w-full bg-amber-500 px-4 py-2 rounded-md hover:bg-stone-900 hover:text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>

      <Divider />

      <p className="text-center text-sm">
        Already have an account?{' '}
        <a className="text-amber-500 hover:underline" href="sign-in">
          Log In
        </a>
      </p>
    </div>
  );
};

export default SignupPage;