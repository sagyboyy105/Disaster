/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Login, { Role } from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role>(null);
  const [orgName, setOrgName] = useState('');

  const handleLogin = (role: Role, name: string) => {
    setUserRole(role);
    setOrgName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setOrgName('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard 
          role={userRole!} 
          orgName={orgName} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}

