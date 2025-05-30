import React from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import svg from '../../assets/SecureSphere.svg';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-6 bg-[#030712] px-4">
      <div className="bg-[#0d1420] rounded-xl shadow-xl max-w-xl w-full p-8 border border-[#102239]">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-full  mb-[-25px]">
            <div className="w-40 h-32 mt-[-35px] mb-3">
              <img src={svg} alt="SecureSphere" className="w-40 h-32" />
            </div>
          </div>
          <h2 className="text-white text-2xl text-center font-bold mb-3">Create your SecureSphere account</h2>
          <p className="text-gray-400 text-center text-sm">
            Join us and stay protected online
          </p>
        </div>

        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-gray-300 font-semibold mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <AiOutlineUser />
              </span>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#06121e] text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-secureSphere-purple border border-transparent
                           focus:border-secureSphere-purple transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 font-semibold mb-1">
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
            <label htmlFor="password" className="block text-gray-300 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <AiOutlineLock />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#06121e] text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-secureSphere-purple border border-transparent
                           focus:border-secureSphere-purple transition"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-300 font-semibold mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <AiOutlineLock />
              </span>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#06121e] text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-secureSphere-purple border border-transparent
                           focus:border-secureSphere-purple transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light
                       rounded-md text-white font-semibold hover:opacity-90 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Sign in link */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-secureSphere-purple hover:underline font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
