import React, { useState } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';

export default function Users() {
  // Mock users database
  const [users, setUsers] = useState([
    { id: 1, name: 'Sophea Kim', email: 'sophea.kim@example.com', role: 'Administrator', status: 'Active', joined: '2026-01-15' },
    { id: 2, name: 'Dara Pich', email: 'dara.pich@example.com', role: 'Editor', status: 'Active', joined: '2026-03-22' },
    { id: 3, name: 'Sokha Chan', email: 'sokha.chan@example.com', role: 'Viewer', status: 'Offline', joined: '2026-05-10' },
    { id: 4, name: 'Borith Seng', email: 'borith.seng@example.com', role: 'Editor', status: 'Suspended', joined: '2026-06-02' },
    { id: 5, name: 'Vanna Meas', email: 'vanna.meas@example.com', role: 'Viewer', status: 'Active', joined: '2026-06-25' }
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('Viewer');
  const [formStatus, setFormStatus] = useState('Active');

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setModalMode('add');
    setFormName('');
    setFormEmail('');
    setFormRole('Viewer');
    setFormStatus('Active');
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormStatus(user.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    if (modalMode === 'add') {
      const newUser = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: formName,
        email: formEmail,
        role: formRole,
        status: formStatus,
        joined: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(u => u.id === selectedUser.id ? { 
        ...u, 
        name: formName, 
        email: formEmail, 
        role: formRole, 
        status: formStatus 
      } : u));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Helper for generating background avatars
  const getAvatarInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarGradient = (id) => {
    const gradients = [
      'from-pink-500 to-rose-500',
      'from-purple-500 to-indigo-500',
      'from-blue-500 to-sky-500',
      'from-teal-500 to-emerald-500',
      'from-amber-500 to-orange-500'
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Users Directory</h2>
          <p className="text-white/50 text-xs mt-1">Manage system privileges, profiles, and account statuses.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold tracking-wider transition-all duration-200 shadow-lg shadow-blue-500/15 cursor-pointer"
        >
          <FaUserPlus className="w-3.5 h-3.5" />
          <span>ADD NEW USER</span>
        </button>
      </div>

      {/* Control bar */}
      <div className="flex items-center max-w-md bg-[#1e1e30] border border-white/5 px-4 py-2.5 rounded-full">
        <FaSearch className="text-white/40 w-4 h-4 mr-3" />
        <input
          type="text"
          placeholder="Filter by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none text-white text-xs w-full focus:outline-none placeholder-white/30"
        />
      </div>

      {/* Directory Table Grid */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#17182b]/50 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date Added</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    {/* User profile cell */}
                    <td className="py-4 px-6 flex items-center space-x-4">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${getAvatarGradient(user.id)} flex items-center justify-center font-bold text-white text-[11px] shadow-md`}>
                        {getAvatarInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{user.name}</div>
                        <div className="text-white/40 text-[11px]">{user.email}</div>
                      </div>
                    </td>
                    
                    {/* Role */}
                    <td className="py-4 px-6 align-middle font-medium text-white/80">
                      {user.role}
                    </td>
                    
                    {/* Status badge */}
                    <td className="py-4 px-6 align-middle">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        user.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : user.status === 'Offline'
                          ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    
                    {/* Date joined */}
                    <td className="py-4 px-6 align-middle text-white/50">
                      {user.joined}
                    </td>
                    
                    {/* Action buttons */}
                    <td className="py-4 px-6 align-middle text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 text-white/60 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all"
                          title="Edit User"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                          title="Delete User"
                        >
                          <FaTrashAlt className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-white/40 font-medium">
                    No users match your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content container */}
          <div className="relative w-full max-w-md bg-[#1e1e30] border border-white/10 rounded-2xl p-6 shadow-2xl z-10 animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {modalMode === 'add' ? 'Add User Credentials' : 'Edit User Settings'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chan Samnang"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. samnang@domain.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-lg custom-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Role */}
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">Role Privilege</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input bg-[#141526]"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">User Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-lg custom-input bg-[#141526]"
                  >
                    <option value="Active">Active</option>
                    <option value="Offline">Offline</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-lg text-xs font-semibold tracking-wider transition-all"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold tracking-wider transition-all shadow-md shadow-blue-500/10"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
