import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaUsers, FaBoxOpen, FaShoppingBag, FaUser, FaTimes, FaReact } from 'react-icons/fa';

export default function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { name: 'DASHBOARD', path: '/dashboard', icon: <MdDashboard className="w-5 h-5" /> },
    { name: 'USERS', path: '/users', icon: <FaUsers className="w-5 h-5" /> },
    { name: 'PRODUCTS', path: '/products', icon: <FaBoxOpen className="w-5 h-5" /> },
    { name: 'ORDERS', path: '/orders', icon: <FaShoppingBag className="w-5 h-5" /> },
    { name: 'USER PROFILE', path: '/profile', icon: <FaUser className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 sidebar-gradient text-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <FaReact className="w-8 h-8 text-cyan-200 animate-spin-slow" style={{ animationDuration: '8s' }} />
            <span className="font-bold tracking-wider text-lg">CREATIVE TIM</span>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 md:hidden focus:outline-none"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-lg shadow-blue-900/20'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Upgrade to Pro footer item */}
        <div className="p-4 border-t border-white/10">
          <a
            href="#upgrade"
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center w-full py-3 bg-white text-blue-600 rounded-full text-xs font-bold tracking-wider hover:bg-blue-50 transition-all duration-200 shadow-md"
          >
            UPGRADE TO PRO
          </a>
        </div>
      </aside>
    </>
  );
}
