import { Divider, Input, Radio } from 'antd';

const FormSignIn = () => {
  return (
    <>
      <div className="p-8 bg-slate-200 rounded-lg">
        <h2 className="font-bold text-2xl text-center mb-5">Welcome Back</h2>
        <p className="font-light text-base text-center mb-8">Login To Your FKoi Account!</p>
        <div className="flex items-center justify-center cursor-pointer bg-green-400 my-4">
          <i className="fa-brands fa-google"></i>
          <p className="ml-3">Continue with Google</p>
        </div>
        <Input
          className="my-4 text-sm"
          size="large"
          placeholder="Email address"
          prefix={<i className="fa-solid fa-envelope"></i>}
        />
        <Input
          className="my-4 text-sm"
          size="large"
          placeholder="Password"
          prefix={<i className="fa-solid fa-key"></i>}
        />
        <Radio>Remember me</Radio>
        <br />
        <button className="my-4 w-full bg-amber-500 px-4 py-2 rounded-md hover:bg-stone-900 hover:text-white">
          Sign In
        </button>
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
          <a className="text-amber-500 hover:underline" href="#">
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
};

export default FormSignIn;
