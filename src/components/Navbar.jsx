import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaBars, FaSearch, FaBell, FaGlobe, FaUser } from 'react-icons/fa';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  // Determine page title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'ផ្ទាំងគ្រប់គ្រង';
      case '/users':
        return 'អ្នកប្រើប្រាស់';
      case '/products':
        return 'ផលិតផល';
      case '/orders':
        return 'ការបញ្ជាទិញ';
      case '/profile':
        return 'ប្រវត្តិរូបអ្នកប្រើប្រាស់';
      default:
        return 'ផ្ទាំងគ្រប់គ្រង';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#141526]/85 backdrop-blur-md border-b border-white/5">
      {/* Mobile Toggle & Route Name */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-white/75 hover:bg-white/10 focus:outline-none md:hidden transition-colors"
        >
          <FaBars className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold tracking-wider text-white/90 hidden sm:inline-block">
          {getPageTitle()}
        </span>
      </div>

      {/* Navigation Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="ស្វែងរក..."
            className="w-36 sm:w-56 px-4 py-2 pr-10 text-xs rounded-full custom-input"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 cursor-pointer hover:text-white transition-colors">
            <FaSearch className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Globe / Stats icon */}
        <button className="p-2 rounded-full text-white/70 hover:bg-white/5 hover:text-white transition-all hidden xs:block">
          <FaGlobe className="w-4 h-4" />
        </button>

        {/* Notifications Icon */}
        <button className="relative p-2 rounded-full text-white/70 hover:bg-white/5 hover:text-white transition-all">
          <FaBell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-[#141526]" />
        </button>

        {/* User Profile Shortcut */}
        <Link
          to="/profile"
          className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/20 flex items-center justify-center hover:border-blue-500/50 transition-all shadow-md shadow-blue-500/5"
        >
          <img src="/profile.jpg" alt="User Profile" className="w-full h-full object-cover" />
        </Link>
      </div>
    </header>
  );
}
