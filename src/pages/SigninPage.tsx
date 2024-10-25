import { Divider } from "antd";
import FormSignIn from "../components/form/FormSignIn";

const SignInPage: React.FC = () => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-slate-300 p-4"
    >
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 sm:p-8">
        <h2 className="text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Welcome to F Care Shop
        </h2>
        <p className="text-center text-base text-gray-600 sm:text-lg">
          Sign in to your account
        </p>
        <FormSignIn />
        <p className="text-center text-xs text-gray-500 sm:text-sm">
          By signing in, you agree to our{" "}
          <a className="text-black underline hover:text-red-500" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="text-black underline hover:text-red-500" href="#">
            Privacy Policy
          </a>
          .
        </p>
        <Divider />
        <p className="text-center text-xs sm:text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-red-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
