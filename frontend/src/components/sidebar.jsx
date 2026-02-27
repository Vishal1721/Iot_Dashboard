import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, 
  FaProjectDiagram, 
  FaMapMarkerAlt, 
  FaBook, 
  FaUser, 
  FaSignOutAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Projects', path: '/projects', icon: FaProjectDiagram },
    { name: 'LiveTracking', path: '/liveTracking', icon: FaMapMarkerAlt },
    { name: 'Tutorial', path: '/tutorial', icon: FaBook },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-[#1e3a5f] to-[#0f1f3d] text-white fixed h-screen">
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-3 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-white hover:bg-blue-700/30'
              }`}
            >
              <Icon className="text-xl text-white" />
              <span className="font-semibold text-lg text-white">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-3 border-t border-gray-700">

        {/* Profile */}
        <Link
          to="/profile"
          className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 ${
            location.pathname === '/profile'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-white hover:bg-blue-700/30'
          }`}
        >
          <FaUser className="text-xl text-white" />
          <span className="font-semibold text-lg text-white">Profile</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-white hover:bg-red-600/30 transition-all duration-200"
        >
          <FaSignOutAlt className="text-xl text-white" />
          <span className="font-semibold text-lg text-white">Logout</span>
        </button>

      </div>
    </div>
  );
};

export default Sidebar;