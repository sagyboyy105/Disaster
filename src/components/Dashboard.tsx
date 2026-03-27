import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, MapPin, AlertTriangle, Users, CheckCircle, Clock, Search, ChevronLeft, Menu, History, FileText, Lock } from 'lucide-react';
import { DisasterArea, Priority, Status } from '../data/mockData';
import Map from './Map';
import { Role } from './Login';

interface DashboardProps {
  role: Role;
  orgName: string;
  onLogout: () => void;
  areas: DisasterArea[];
  setAreas: React.Dispatch<React.SetStateAction<DisasterArea[]>>;
}

export default function Dashboard({ role, orgName, onLogout, areas, setAreas }: DashboardProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Active' | 'Completed'>('All');
  const [viewMode, setViewMode] = useState<'all' | 'my-tasks' | 'others-tasks'>('all');

  const selectedArea = useMemo(() => areas.find(a => a.id === selectedAreaId), [areas, selectedAreaId]);

  const filteredAreas = useMemo(() => {
    return areas.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.includes(searchQuery);
      const matchesFilter = 
        statusFilter === 'All' ? true :
        statusFilter === 'Pending' ? a.status === 'Pending' :
        statusFilter === 'Active' ? (a.status === 'Assigned' || a.status === 'In Progress') :
        statusFilter === 'Completed' ? a.status === 'Completed' : true;
      
      const matchesViewMode = 
        viewMode === 'all' ? true : 
        viewMode === 'my-tasks' ? a.assignedTo === orgName :
        (a.status !== 'Pending' && !!a.assignedTo && a.assignedTo !== orgName);
      
      return matchesSearch && matchesFilter && matchesViewMode;
    });
  }, [areas, searchQuery, statusFilter, viewMode, orgName]);

  const stats = useMemo(() => {
    return {
      total: areas.length,
      pending: areas.filter(a => a.status === 'Pending').length,
      active: areas.filter(a => a.status === 'Assigned' || a.status === 'In Progress').length,
      completed: areas.filter(a => a.status === 'Completed').length,
    };
  }, [areas]);

  const handleAssign = () => {
    if (!selectedAreaId) return;
    
    setAreas(prev => prev.map(area => {
      if (area.id === selectedAreaId) {
        return {
          ...area,
          status: 'Assigned',
          assignedTo: orgName,
          assigneeType: role
        };
      }
      return area;
    }));
  };

  const handleStatusUpdate = (newStatus: Status) => {
    if (!selectedAreaId) return;
    
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
    <div className="h-screen w-full bg-slate-50 relative overflow-hidden font-sans">
      
      {/* Full Screen Map */}
      <div className="absolute inset-0 z-0">
        <Map areas={filteredAreas} selectedAreaId={selectedAreaId} onSelectArea={setSelectedAreaId} currentUserOrg={orgName} />
      </div>

      {/* Collapsible Left Panel */}
      <AnimatePresence initial={false}>
        {isPanelOpen && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-4 left-4 bottom-4 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-[1000] overflow-hidden"
          >
            <div className="p-5 border-b border-slate-200 bg-white/50">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">RescueSphere</h1>
                    <p className="text-xs text-slate-500 font-medium">{orgName} ({role})</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={onLogout} 
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                  <button 
                    onClick={() => setIsPanelOpen(false)} 
                    className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Collapse Panel"
                  >
                    <ChevronLeft size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-5">
                <button 
                  onClick={() => setStatusFilter('All')}
                  className={`rounded-xl p-2 flex flex-col items-center justify-center border transition-all ${statusFilter === 'All' ? 'bg-slate-200 border-slate-400 shadow-inner' : 'bg-slate-100/80 border-slate-200/50 hover:bg-slate-200/50'}`}>
                  <span className="text-lg font-bold text-slate-700">{stats.total}</span>
                  <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Total</span>
                </button>
                <button 
                  onClick={() => setStatusFilter('Pending')}
                  className={`rounded-xl p-2 flex flex-col items-center justify-center border transition-all ${statusFilter === 'Pending' ? 'bg-red-100 border-red-300 shadow-inner' : 'bg-red-50/80 border-red-100/50 hover:bg-red-100/50'}`}>
                  <span className="text-lg font-bold text-red-600">{stats.pending}</span>
                  <span className="text-[9px] font-semibold text-red-600/70 uppercase tracking-wider">Pending</span>
                </button>
                <button 
                  onClick={() => setStatusFilter('Active')}
                  className={`rounded-xl p-2 flex flex-col items-center justify-center border transition-all ${statusFilter === 'Active' ? 'bg-blue-100 border-blue-300 shadow-inner' : 'bg-blue-50/80 border-blue-100/50 hover:bg-blue-100/50'}`}>
                  <span className="text-lg font-bold text-blue-600">{stats.active}</span>
                  <span className="text-[9px] font-semibold text-blue-600/70 uppercase tracking-wider">Active</span>
                </button>
                <button 
                  onClick={() => setStatusFilter('Completed')}
                  className={`rounded-xl p-2 flex flex-col items-center justify-center border transition-all ${statusFilter === 'Completed' ? 'bg-emerald-100 border-emerald-300 shadow-inner' : 'bg-emerald-50/80 border-emerald-100/50 hover:bg-emerald-100/50'}`}>
                  <span className="text-lg font-bold text-emerald-600">{stats.completed}</span>
                  <span className="text-[9px] font-semibold text-emerald-600/70 uppercase tracking-wider">Done</span>
                </button>
              </div>

              <div className="flex border-b border-slate-200 mb-2">
                <button 
                  onClick={() => setViewMode('all')}
                  className={`flex-1 py-2 text-xs font-bold transition-colors ${viewMode === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  All Areas
                </button>
                <button 
                  onClick={() => setViewMode('my-tasks')}
                  className={`flex-1 py-2 text-xs font-bold transition-colors ${viewMode === 'my-tasks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  My Tasks
                </button>
                <button 
                  onClick={() => setViewMode('others-tasks')}
                  className={`flex-1 py-2 text-xs font-bold transition-colors ${viewMode === 'others-tasks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Others' Tasks
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search areas by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100/80 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm transition-all outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar bg-slate-50/30">
              {filteredAreas.length === 0 ? (
                <div className="text-center p-8 text-slate-500 text-sm">
                  {viewMode === 'my-tasks' ? "You don't have any assignments yet." : 
                   viewMode === 'others-tasks' ? "No areas are currently assigned to other organizations." : 
                   `No areas found matching "${searchQuery}"`}
                </div>
              ) : (
                filteredAreas.map(area => {
                  const isLockedByOther = area.status !== 'Pending' && area.assignedTo !== orgName;
                  
                  return (
                  <motion.button
                    key={area.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedAreaId(area.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedAreaId === area.id 
                        ? 'bg-white border-blue-300 shadow-md ring-1 ring-blue-200 z-10 relative' 
                        : isLockedByOther
                          ? 'bg-slate-50/50 border-slate-200 opacity-75 hover:opacity-100'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold ${isLockedByOther ? 'text-slate-600' : 'text-slate-800'}`}>{area.name}</h3>
                        {isLockedByOther && <Lock size={14} className="text-slate-400" />}
                      </div>
                      {getPriorityBadge(area.priority)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-slate-400" />
                        <span>{area.peopleAffected.toLocaleString()}</span>
                      </div>
                      {getStatusBadge(area.status)}
                    </div>
                  </motion.button>
                )})
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button (when closed) */}
      <AnimatePresence>
        {!isPanelOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            onClick={() => setIsPanelOpen(true)}
            className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-slate-200 text-slate-700 hover:text-blue-600 hover:scale-105 transition-all"
          >
            <Menu size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Selected Area Details Overlay (Right Side) */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-4 right-4 bottom-4 w-[420px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-[1000] flex flex-col"
          >
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{selectedArea.name}</h2>
                    <div className="flex gap-2">
                      {getPriorityBadge(selectedArea.priority)}
                      {getStatusBadge(selectedArea.status)}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAreaId(null)}
                    className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft size={18} className="rotate-180" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Damage</p>
                          <p className="text-sm text-slate-700 font-medium leading-tight">{selectedArea.damageLevel}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <div className="flex items-start gap-3">
                        <Users className="text-blue-500 shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Affected</p>
                          <p className="text-sm text-slate-700 font-bold">{selectedArea.peopleAffected.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedArea.description}</p>
                  </div>

                  {/* Detailed Assessment */}
                  {selectedArea.detailedDescription && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText size={16} className="text-slate-400" />
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detailed Assessment</h4>
                      </div>
                      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {selectedArea.detailedDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Historical Data */}
                  {selectedArea.historicalData && selectedArea.historicalData.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <History size={16} className="text-slate-400" />
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Historical Context</h4>
                      </div>
                      <ul className="space-y-3">
                        {selectedArea.historicalData.map((data, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                            <span className="leading-snug">{data}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Images */}
                  {selectedArea.imageUrls && selectedArea.imageUrls.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" />
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location Images</h4>
                        </div>
                        <select 
                          className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-slate-50 text-slate-600 outline-none focus:border-blue-400"
                          onChange={(e) => {
                            const imgElements = document.querySelectorAll('.disaster-image');
                            imgElements.forEach(img => {
                              (img as HTMLElement).style.filter = e.target.value;
                            });
                          }}
                        >
                          <option value="none">Normal</option>
                          <option value="grayscale(100%)">Grayscale</option>
                          <option value="contrast(150%)">High Contrast</option>
                          <option value="invert(100%)">Invert Colors</option>
                          <option value="sepia(100%)">Sepia</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedArea.imageUrls.map((url, idx) => (
                          <img 
                            key={idx} 
                            src={url} 
                            alt={`${selectedArea.name} damage`} 
                            className="disaster-image w-full h-28 object-cover rounded-xl border border-slate-200 shadow-sm transition-all duration-300" 
                            referrerPolicy="no-referrer" 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedArea.assignedTo && selectedArea.assignedTo === orgName && (
                    <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl border border-blue-100 flex items-center gap-3 mt-4">
                      <CheckCircle size={20} className="text-blue-600 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-blue-600/70 uppercase tracking-wider mb-0.5">Assigned to You</p>
                        <p className="font-bold">{selectedArea.assignedTo}</p>
                      </div>
                    </div>
                  )}

                  {selectedArea.status !== 'Pending' && selectedArea.assignedTo !== orgName && (
                    <div className="bg-slate-100 text-slate-700 text-sm p-4 rounded-xl border border-slate-200 flex items-center gap-3 mt-4">
                      <Lock size={20} className="text-slate-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Area Locked</p>
                        <p className="font-medium">Currently rehabilitated by <strong>{selectedArea.assignedTo}</strong> ({selectedArea.assigneeType})</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons (Fixed at bottom) */}
            <div className="p-5 border-t border-slate-200 bg-white shrink-0">
              {selectedArea.status === 'Pending' ? (
                <button
                  onClick={handleAssign}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MapPin size={18} />
                  Assign to {orgName}
                </button>
              ) : selectedArea.assignedTo === orgName ? (
                <div className="grid grid-cols-2 gap-3">
                  {selectedArea.status !== 'In Progress' && selectedArea.status !== 'Completed' && (
                    <button
                      onClick={() => handleStatusUpdate('In Progress')}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 text-sm hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Clock size={16} />
                      Start Work
                    </button>
                  )}
                  {selectedArea.status !== 'Completed' && (
                    <button
                      onClick={() => handleStatusUpdate('Completed')}
                      className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 text-sm hover:scale-[1.02] active:scale-[0.98] ${
                        selectedArea.status === 'In Progress' ? 'col-span-1' : 'col-span-2'
                      }`}
                    >
                      <CheckCircle size={16} />
                      Mark Completed
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center gap-2">
                  <Lock size={16} className="text-slate-400" />
                  <p className="text-sm font-medium text-slate-500">Locked by {selectedArea.assignedTo} ({selectedArea.assigneeType})</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
