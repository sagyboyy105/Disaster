import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Users } from 'lucide-react';

export type Role = 'NGO' | 'Government' | null;

interface LoginProps {
  onLogin: (role: Role, name: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && name.trim()) {
      onLogin(selectedRole, name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center bg-blue-600 text-white">
          <h1 className="text-3xl font-bold mb-2">RescueSphere</h1>
          <p className="text-blue-100">Right Help, Right Place, Right Time</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('NGO')}
                className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                  selectedRole === 'NGO' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 hover:border-blue-300 text-slate-600'
                }`}
              >
                <Users size={24} />
                <span className="font-medium">NGO</span>
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedRole('Government')}
                className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                  selectedRole === 'Government' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 hover:border-blue-300 text-slate-600'
                }`}
              >
                <Shield size={24} />
                <span className="font-medium">Government</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Organization Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Global Relief Fund"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedRole || !name.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enter Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
