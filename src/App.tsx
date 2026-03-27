/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Login, { Role } from './components/Login';
import Dashboard from './components/Dashboard';
import { DisasterArea, initialAreas } from './data/mockData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role>(null);
  const [orgName, setOrgName] = useState('');
  
  // Initialize areas from localStorage or fallback to initialAreas
  const [areas, setAreas] = useState<DisasterArea[]>(() => {
    const savedAreas = localStorage.getItem('rescueSphereAreas');
    if (savedAreas) {
      try {
        return JSON.parse(savedAreas);
      } catch (e) {
        console.error("Failed to parse saved areas", e);
      }
    }
    return initialAreas;
  });

  // Persist areas to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rescueSphereAreas', JSON.stringify(areas));
  }, [areas]);

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
          areas={areas}
          setAreas={setAreas}
        />
      )}
    </div>
  );
}

