import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import svg from "../../assets/SecureSphere.svg";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-5 bg-[#030712] px-4">
      <div className="bg-[#0d1420] rounded-xl shadow-xl max-w-xl w-full p-8 border border-[#102239]">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-full mb-4">
            <div className="w-40 h-32 mb-[-25px]">
              <img src={svg} alt="SecureSphere" className="w-40 h-32" />
            </div>
          </div>
          <h2 className="text-white text-center text-2xl font-bold mb-3">
            Welcome back to SecureSphere
          </h2>
          <p className="text-gray-400 text-center text-sm">
            Sign in to access your personalized dashboard
          </p>
        </div>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 font-semibold mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <AiOutlineMail />
              </span>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#06121e] text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-secureSphere-purple border border-transparent 
                           focus:border-secureSphere-purple transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-gray-300 font-semibold"
              >
                Password
              </label>
              <a
                href="#!"
                className="text-secureSphere-purple text-sm hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <AiOutlineLock />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#06121e] text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-secureSphere-purple border border-transparent 
                           focus:border-secureSphere-purple transition"
              />
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center space-x-2 text-gray-300">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 bg-[#06121e] text-secureSphere-purple focus:ring-secureSphere-purple"
            />
            <label htmlFor="remember" className="select-none">
              Remember me
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light 
                       rounded-md text-white font-semibold hover:opacity-90 transition duration-300"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-3">Or continue with</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Social Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-700 
                       rounded-md py-2 text-white hover:bg-[#14232e] transition"
          >
            <FcGoogle size={20} />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-700 
                       rounded-md py-2 text-white hover:bg-[#14232e] transition"
          >
            <FaFacebookF size={20} className="text-blue-600" />
            Facebook
          </button>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-secureSphere-purple hover:underline font-semibold"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
