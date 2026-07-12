import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCamera, FaCheck } from 'react-icons/fa';

export default function Profile() {
  // Profile state details
  const [profile, setProfile] = useState({
    username: 'alec.thompson',
    email: 'alec.thompson@example.com',
    firstName: 'Alec',
    lastName: 'Thompson',
    address: 'Vimean Phnom Penh, Sen Sok',
    city: 'Phnom Penh',
    country: 'Cambodia',
    postalCode: '12000',
    jobTitle: 'CEO / Co-Founder',
    aboutMe: "Don't be scared of the truth because we need to restart the human foundation in truth. I'm a developer trying to build tools that make workflows seamless and beautiful.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  });

  const [notification, setNotification] = useState(false);

  const handleChange = (field, val) => {
    setProfile({
      ...profile,
      [field]: val
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Toast Alert Banner */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2.5 bg-green-500 text-white px-5 py-3 rounded-xl shadow-xl border border-green-400 text-xs font-semibold animate-fade-in-up">
          <FaCheck className="w-3.5 h-3.5" />
          <span>Profile configuration saved successfully!</span>
        </div>
      )}

      {/* Header Info */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">User Profile</h2>
        <p className="text-white/50 text-xs mt-1">Configure details, manage preferences, and review operations logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Form Editor Panel */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Edit Profile Credentials</h3>
          
          <form onSubmit={handleSave} className="space-y-5">
            {/* Section 1: User info */}
            <div className="space-y-4">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-1">User Information</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={profile.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={profile.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={profile.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact info */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-1">Contact Information</span>
              
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Home Address</label>
                <input
                  type="text"
                  required
                  value={profile.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={profile.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={profile.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={profile.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: About me */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-1">About Me Summary</span>
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Biographical Details</label>
                <textarea
                  rows="4"
                  value={profile.aboutMe}
                  onChange={(e) => handleChange('aboutMe', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-lg custom-input resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold tracking-wider transition-all duration-200 shadow-md shadow-blue-500/15 cursor-pointer"
              >
                SAVE PROFILE DETAILS
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Profile Card */}
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between shadow-xl">
          {/* Card Header Background */}
          <div className="h-28 sidebar-gradient relative">
            {/* Overlay avatar */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <div className="relative group">
                <img
                  src={profile.avatar}
                  alt={profile.firstName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#141526] shadow-xl"
                />
                <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FaCamera className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card Body Profile Details */}
          <div className="px-6 pt-14 pb-8 flex-grow text-center space-y-4">
            <div>
              <h4 className="text-lg font-bold text-white tracking-wide">
                {profile.firstName} {profile.lastName}
              </h4>
              <div className="flex items-center justify-center space-x-1.5 text-xs text-white/50 font-medium mt-1">
                <FaBriefcase className="w-3 h-3" />
                <span>{profile.jobTitle}</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-white/45 font-medium mt-0.5">
                <FaMapMarkerAlt className="w-3 h-3 text-red-400" />
                <span>{profile.city}, {profile.country}</span>
              </div>
            </div>

            <p className="text-white/60 text-xs leading-relaxed max-w-xs mx-auto">
              "{profile.aboutMe}"
            </p>

            {/* Quick Metrics stats */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-5 max-w-xs mx-auto">
              <div>
                <span className="block text-white font-extrabold text-sm tracking-wider">22</span>
                <span className="block text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">Projects</span>
              </div>
              <div>
                <span className="block text-white font-extrabold text-sm tracking-wider">245</span>
                <span className="block text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">Followers</span>
              </div>
              <div>
                <span className="block text-white font-extrabold text-sm tracking-wider">10.2k</span>
                <span className="block text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">Contracts</span>
              </div>
            </div>
          </div>

          {/* Social connections shortcut */}
          <div className="px-6 py-4 bg-[#17182b]/35 border-t border-white/5 text-center">
            <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Connect with team members</span>
          </div>
        </div>

      </div>
    </div>
  );
}
