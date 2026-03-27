import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, MapPin, AlertTriangle, Users, CheckCircle, Clock } from 'lucide-react';
import { DisasterArea, initialAreas, Priority, Status } from '../data/mockData';
import Map from './Map';
import { Role } from './Login';

interface DashboardProps {
  role: Role;
  orgName: string;
  onLogout: () => void;
}

export default function Dashboard({ role, orgName, onLogout }: DashboardProps) {
  const [areas, setAreas] = useState<DisasterArea[]>(initialAreas);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  const selectedArea = useMemo(() => areas.find(a => a.id === selectedAreaId), [areas, selectedAreaId]);

  const stats = useMemo(() => {
    return {
      total: areas.length,
      assigned: areas.filter(a => a.status !== 'Pending').length,
      pending: areas.filter(a => a.status === 'Pending').length,
      completed: areas.filter(a => a.status === 'Completed').length,
    };
  }, [areas]);

  const handleAssign = () => {
    if (!selectedAreaId || role !== 'NGO') return;
    
    setAreas(prev => prev.map(area => {
      if (area.id === selectedAreaId) {
        return {
          ...area,
          status: 'Assigned',
          assignedTo: orgName
        };
      }
      return area;
    }));
  };

  const handleStatusUpdate = (newStatus: Status) => {
    if (!selectedAreaId || role !== 'NGO') return;
    
    setAreas(prev => prev.map(area => {
      if (area.id === selectedAreaId && area.assignedTo === orgName) {
        return {
          ...area,
          status: newStatus
        };
      }
      return area;
    }));
  };

  const getPriorityBadge = (priority: Priority) => {
    const colors = {
      High: 'bg-red-100 text-red-700 border-red-200',
      Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Low: 'bg-green-100 text-green-700 border-green-200'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[priority]}`}>
        {priority} Priority
      </span>
    );
  };

  const getStatusBadge = (status: Status) => {
    const colors = {
      Pending: 'bg-slate-100 text-slate-700 border-slate-200',
      Assigned: 'bg-blue-100 text-blue-700 border-blue-200',
      'In Progress': 'bg-purple-100 text-purple-700 border-purple-200',
      Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden font-sans">
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MapPin className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">RescueSphere</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-slate-600 font-medium">Total: {stats.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-slate-600 font-medium">Assigned: {stats.assigned}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 font-medium">Completed: {stats.completed}</span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">{orgName}</p>
              <p className="text-xs text-slate-500">{role}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar List */}
        <aside className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Affected Areas</h2>
            <p className="text-sm text-slate-500">Select an area to view details or assign.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {areas.map(area => (
              <motion.button
                key={area.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedAreaId(area.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedAreaId === area.id 
                    ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-200' 
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-800">{area.name}</h3>
                  {getPriorityBadge(area.priority)}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-3">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{area.peopleAffected.toLocaleString()} affected</span>
                  </div>
                  {getStatusBadge(area.status)}
                </div>
              </motion.button>
            ))}
          </div>
        </aside>

        {/* Map Area */}
        <main className="flex-1 relative p-4 bg-slate-50/50">
          <Map areas={areas} selectedAreaId={selectedAreaId} onSelectArea={setSelectedAreaId} />
          
          {/* Selected Area Details Overlay */}
          <AnimatePresence>
            {selectedArea && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-8 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-[1000]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-1">{selectedArea.name}</h2>
                      <div className="flex gap-2">
                        {getPriorityBadge(selectedArea.priority)}
                        {getStatusBadge(selectedArea.status)}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedAreaId(null)}
                      className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors"
                    >
                      <LogOut size={16} className="rotate-180" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Damage Assessment</p>
                          <p className="text-sm text-slate-700">{selectedArea.damageLevel}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex items-start gap-3">
                        <Users className="text-blue-500 shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">People Affected</p>
                          <p className="text-sm text-slate-700 font-medium">{selectedArea.peopleAffected.toLocaleString()} individuals</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 leading-relaxed">{selectedArea.description}</p>
                    </div>

                    {selectedArea.assignedTo && (
                      <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                        <CheckCircle size={16} className="text-blue-600" />
                        <span>Assigned to: <strong>{selectedArea.assignedTo}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {role === 'NGO' && (
                    <div className="pt-4 border-t border-slate-100">
                      {selectedArea.status === 'Pending' ? (
                        <button
                          onClick={handleAssign}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
                        >
                          <MapPin size={18} />
                          Assign to {orgName}
                        </button>
                      ) : selectedArea.assignedTo === orgName ? (
                        <div className="grid grid-cols-2 gap-3">
                          {selectedArea.status !== 'In Progress' && selectedArea.status !== 'Completed' && (
                            <button
                              onClick={() => handleStatusUpdate('In Progress')}
                              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                              <Clock size={16} />
                              Start Work
                            </button>
                          )}
                          {selectedArea.status !== 'Completed' && (
                            <button
                              onClick={() => handleStatusUpdate('Completed')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm col-span-2"
                            >
                              <CheckCircle size={16} />
                              Mark Completed
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <p className="text-sm text-slate-500">This area is assigned to another organization.</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {role === 'Government' && (
                    <div className="pt-4 border-t border-slate-100 text-center">
                      <p className="text-sm text-slate-500 italic">Government view: Monitoring mode active.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
