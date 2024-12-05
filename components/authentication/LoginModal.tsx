import Image from "next/image";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Animate the overlay's fade-out
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative overflow-hidden w-full max-w-4xl rounded-lg shadow-xl bg-gradient-to-tr from-white to-[#BCACFF]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute z-[999] top-4 left-4 text-2xl text-[#7152F3] hover:text-gray-600"
            >
              &times;
            </button>
            <div className="bg-[#241E3C] w-[65%] h-[120%] clip-circle absolute top-0 -left-[2rem]"></div>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Section */}
              <div className="flex-1 px-16 pt-16 text-white clip-circle">
                <h2 className="text-4xl font-zrnic max-w-[70%]">Manage and grow with PandaHR!</h2>
                <div className="mt-8 space-y-6">
                  <div className="flex items-center justify-end max-w-[80%]">
                    <Image
                      src="/authentication/projection-1.png"
                      alt="Projection"
                      width={1000}
                      height={1000}
                      className="max-w-[150px]"
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <Image
                      src="/authentication/projection-2.png"
                      alt="Projection"
                      width={1000}
                      height={1000}
                      className="max-w-[150px]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex-[0.7] px-8 py-12">
                <h2 className="text-3xl text-[#241E3C] font-lexend">
                  Welcome Back!
                </h2>
                <form className="mt-6 space-y-4">
                  <div className="mb-4">
                    <input
                      type="email"
                      className="w-full text-[#241E3C] bg-transparent p-3 border border-[#241E3C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#241E3C]"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="w-full text-[#241E3C] bg-transparent p-3 border border-[#241E3C] rounded-md focus:outline-none focus:ring-1 focus:ring-[#241E3C]"
                      placeholder="Password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember Me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-[#7152F3]">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full p-2 text-white border border-[#241E3C] bg-[#241E3C] rounded-md hover:bg-white hover:text-[#241E3C] duration-300 transition-all"
                  >
                    Login
                  </button>
                </form>
                <div className="text-center text-gray-600">or</div>
                <button
                  type="button"
                  className="flex items-center justify-center w-full p-2 text-white bg-[#7152F3] rounded-md border border-[#7152F3] hover:bg-white hover:text-[#241E3C]"
                >
                  Continue with Google
                </button>
                <p className="mt-4 text-center text-sm text-[#241E3C]">
                  First time at PandaHR?{" "}
                  <a href="#" className="text-[#7152F3]">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
