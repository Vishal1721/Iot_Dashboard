import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7a] shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo/Title (shown on mobile) */}
        <div className="md:hidden text-white font-bold text-xl">
          IoT Dashboard
        </div>
        <div className="hidden md:block"></div>

        {/* Right side - User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="flex items-center space-x-2 text-white">
            <FaUser className="text-gray-300" />
            <span className="font-medium hidden sm:inline">
              {user?.firstName || user?.username || 'User'}
            </span>
          </div>

          {/* Quick Start Button */}
          

          {/* Connected Status */}
          

          {/* Notification Bell */}
          <button className="relative p-2 text-white hover:bg-blue-700 rounded-full transition-colors">
            <FaBell className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
