import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/authentication/image-1.png')" }}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <Image 
          src="/logos/logo-white.png"
          alt="Logo"
          width={150}
          height={150}
          className="absolute top-4 left-8"
        />
        <div className="w-full max-w-5xl px-8 py-12 flex bg-transparent">
          {/* Left Section: Form */}
          <div className="flex-1 px-8 py-12 bg-transparent">
            <h2 className="text-3xl text-white font-lexend mb-6">Create Your Account</h2>
            <form className="space-y-4">
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full text-white bg-transparent p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#922AB8] focus:ring-1 focus:ring-[#922AB8]"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="w-full text-white bg-transparent p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#922AB8] focus:ring-1 focus:ring-[#922AB8]"
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full text-white bg-transparent p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#922AB8] focus:ring-1 focus:ring-[#922AB8]"
                  placeholder="Company Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full text-white bg-transparent p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#922AB8] focus:ring-1 focus:ring-[#922AB8]"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full text-white bg-transparent p-3 border border-gray-400 rounded-md focus:outline-none focus:border-[#922AB8] focus:ring-1 focus:ring-[#922AB8]"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="flex items-center">
                <Checkbox id="terms" className="data-[state=checked]:bg-[#922AB8] bg-[#fff]" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium ml-2 text-white"
                >
                  I agree to the Terms and Conditions
                </label>
              </div>
              <button
                type="submit"
                className="w-full p-2 font-bold text-[#241E3C] border border-white bg-white rounded-md hover:bg-transparent hover:text-white duration-300 transition-all"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center text-gray-400 my-4">or</div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full p-2 text-white bg-[#922AB8] rounded-md border border-[#922AB8] hover:bg-transparent hover:border-white hover:text-white  duration-300 transition-all"
            >
              <Image 
                src="/authentication/google.png"
                alt="Google Logo"
                width={25}
                height={25}
              />
              Continue with Google
            </button>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href="#" className="text-[#922AB8]">
                Login
              </a>
            </p>
          </div>

          {/* Right Section: Image */}
          <div className="flex-[1.5] hidden lg:block rounded-xl">
            <Image
              src="/authentication/signup.svg"
              alt="Sign Up Illustration"
              width={1000}
              height={1000}
              layout="contain"
              style={{
                filter: "hue-rotate(40deg)"
              }}
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
