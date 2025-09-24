"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-2 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 Dr. Shaifali Arora. All rights reserved.</p>

        <div className="flex space-x-4 mt-3 sm:mt-0">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            <FaFacebookF size={20} />
          </a>
          <a href="https://www.linkedin.com/in/shaifali-arora-phd-26917580/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
            <FaLinkedinIn size={20} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
