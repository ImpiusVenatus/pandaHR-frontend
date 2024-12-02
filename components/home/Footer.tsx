"use client";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1D1C23] text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Social Media Links */}
        <div>
          <Image
            src="/logos/logo-white.png"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="w-[200px] pb-8"
          />
          <p className="text-sm mb-6 font-dmSans">
            Simplify HR processes and empower your team with our innovative solutions.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-bold mb-4 font-dmSans-bold">Features</h3>
          <ul className="space-y-2 font-dmSans">
            <li>
              <a href="#employee-analytics" className="hover:text-white">
                Employee Analytics
              </a>
            </li>
            <li>
              <a href="#performance-analytics" className="hover:text-white">
                Performance Tracking
              </a>
            </li>
            <li>
              <a href="#time-attendee" className="hover:text-white">
                Attendance Monitoring
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-bold mb-4 font-dmSans-bold">Company</h3>
          <ul className="space-y-2 font-dmSans">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Partners
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4 font-dmSans-bold">Resources</h3>
          <ul className="space-y-2 font-dmSans">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} PandaHR. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
