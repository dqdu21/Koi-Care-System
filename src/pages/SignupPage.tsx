import { Divider } from "antd";
import FormSignUp from "../components/form/FormSignUp";


const SignUpPage = () => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-slate-300 p-4 md:p-0">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
          Welcome to F Care Shop
        </h2>
        <p className="mb-6 text-center text-sm font-light sm:text-base">
          Create an account
        </p>
        <FormSignUp />
        <p className="mt-4 text-center text-xs sm:text-sm">
          By signing up, you agree to our{" "}
          <a className="text-black underline hover:text-red-500" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="text-black underline hover:text-red-500" href="#">
            Privacy Policy
          </a>
          .
        </p>
        <Divider className="my-4" />
        <p className="text-center text-xs sm:text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-red-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
