"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    const section = document.getElementById(tab.toLowerCase());
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const navItems = ["Home", "Product", "Company", "Career"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isScrolled
          ? "bg-black text-white sticky top-0 z-[100]"
          : "bg-white text-black"
      } w-full transition-all duration-500 ease-in-out font-dmSans-bold shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a className="text-2xl font-bold">Logo</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 relative">
              {navItems.map((item) => (
                <button
                  key={item}
                  className={`${
                    activeTab === item ? "text-purple-600" : "hover:text-purple-600"
                  } relative focus:outline-none`}
                  onClick={() => handleNavClick(item)}
                  aria-current={activeTab === item ? "page" : undefined}
                >
                  {item}
                  {activeTab === item && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <a className="hover:text-purple-600 cursor-pointer">Login</a>
            <a className="cursor-pointer border border-black hover:bg-black hover:text-white px-3 py-1 rounded transition-colors duration-300">
              Signup
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item}
              className={`block w-full text-left ${
                activeTab === item
                  ? "text-blue-400 font-semibold"
                  : "hover:text-gray-400"
              }`}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
          <a className="block hover:text-gray-400">Login</a>
          <a className="block hover:text-gray-400 border border-gray-400 px-3 py-1 rounded">
            Signup
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
