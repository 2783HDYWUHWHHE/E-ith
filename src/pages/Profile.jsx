import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCamera, FaCheck } from 'react-icons/fa';

export default function Profile() {
  // Profile state details
  const [profile, setProfile] = useState({
    username: 'samnang.meas',
    email: 'samnang.meas@example.com',
    firstName: 'Samnang',
    lastName: 'Meas',
    address: 'Vimean Phnom Penh, Sen Sok',
    city: 'Phnom Penh',
    country: 'Cambodia',
    postalCode: '12000',
    jobTitle: 'Lead Developer',
    aboutMe: "I am a software engineer based in Phnom Penh. Passionate about building modern, responsive, and visually stunning web applications with React and Tailwind CSS.",
    avatar: '/profile.jpg'
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
          <span>បានរក្សាទុកការកំណត់ប្រវត្តិរូបដោយជោគជ័យ!</span>
        </div>
      )}

      {/* Header Info */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">ប្រវត្តិរូបអ្នកប្រើប្រាស់</h2>
        <p className="text-white/50 text-xs mt-1">កំណត់រចនាសម្ព័ន្ធព័ត៌មានលម្អិត គ្រប់គ្រងចំណូលចិត្ត និងពិនិត្យមើលកំណត់ហេតុប្រតិបត្តិការ។</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Form Editor Panel */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">កែសម្រួលព័ត៌មានសម្ងាត់ប្រវត្តិរូប</h3>
          
          <form onSubmit={handleSave} className="space-y-5">
            {/* Section 1: User info */}
            <div className="space-y-4">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-1">ព័ត៌មានអ្នកប្រើប្រាស់</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">ឈ្មោះអ្នកប្រើប្រាស់</label>
                  <input
                    type="text"
                    required
                    value={profile.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">អាសយដ្ឋានអ៊ីមែល</label>
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
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">នាមខ្លួន</label>
                  <input
                    type="text"
                    required
                    value={profile.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">នាមត្រកូល</label>
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
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-1">ព័ត៌មានទំនាក់ទំនង</span>
              
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">អាសយដ្ឋានផ្ទះ</label>
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
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">ទីក្រុង/ខេត្ត</label>
                  <input
                    type="text"
                    required
                    value={profile.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">ប្រទេស</label>
                  <input
                    type="text"
                    required
                    value={profile.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">លេខកូដប្រៃសណីយ៍</label>
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
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block border-b border-white/5 pb-1">សេចក្តីសង្ខេបអំពីខ្ញុំ</span>
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">ព័ត៌មានជីវប្រវត្តិ</label>
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
                រក្សាទុកព័ត៌មានលម្អិតប្រវត្តិរូប
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
                <span className="block text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">គម្រោង</span>
                </div>
              <div>
                <span className="block text-white font-extrabold text-sm tracking-wider">245</span>
                <span className="block text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">អ្នកតាមដាន</span>
              </div>
              <div>
                <span className="block text-white font-extrabold text-sm tracking-wider">10.2k</span>
                <span className="block text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">កិច្ចសន្យា</span>
              </div>
            </div>
          </div>

          {/* Social connections shortcut */}
          <div className="px-6 py-4 bg-[#17182b]/35 border-t border-white/5 text-center">
            <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">ភ្ជាប់ទំនាក់ទំនងជាមួយសមាជិកក្រុម</span>
          </div>
        </div>

      </div>
    </div>
  );
}
