import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DisasterArea } from '../data/mockData';

interface MapProps {
  areas: DisasterArea[];
  selectedAreaId: string | null;
  onSelectArea: (id: string) => void;
  currentUserOrg: string;
}

// Component to handle map center updates when selection changes
function MapUpdater({ selectedArea, areas }: { selectedArea: DisasterArea | undefined, areas: DisasterArea[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedArea) {
      map.flyTo([selectedArea.lat, selectedArea.lng], 9, {
        duration: 2,
        easeLinearity: 0.25
      });
    } else if (areas.length > 0) {
      // Center on India generally
      map.flyTo([20.5937, 78.9629], 5, {
        duration: 2,
        easeLinearity: 0.25
      });
    }
  }, [selectedArea, map, areas]);

  return null;
}

export default function Map({ areas, selectedAreaId, onSelectArea, currentUserOrg }: MapProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ef4444'; // red-500
      case 'Medium': return '#eab308'; // yellow-500
      case 'Low': return '#22c55e'; // green-500
      default: return '#3b82f6'; // blue-500
    }
  };

  const getRadius = (peopleAffected: number) => {
    const min = 12;
    const max = 40;
    const scaled = (peopleAffected / 50000) * max;
    return Math.max(min, Math.min(scaled, max));
  };

  const selectedArea = areas.find(a => a.id === selectedAreaId);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        scrollWheelZoom={true}
        zoomAnimation={true}
        wheelPxPerZoomLevel={60}
        zoomSnap={0.5}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater selectedArea={selectedArea} areas={areas} />

        {areas.map((area) => {
          const isSelected = area.id === selectedAreaId;
          const isLockedByOther = area.status !== 'Pending' && area.assignedTo !== currentUserOrg;
          const baseColor = getPriorityColor(area.priority);
          const color = isLockedByOther ? '#94a3b8' : baseColor;
          
          return (
            <CircleMarker
              key={area.id}
              center={[area.lat, area.lng]}
              pathOptions={{
                color: isSelected ? '#000' : (isLockedByOther ? '#64748b' : color),
                fillColor: color,
                fillOpacity: isSelected ? 0.9 : (isLockedByOther ? 0.4 : 0.6),
                weight: isSelected ? 3 : (isLockedByOther ? 2 : 1),
                dashArray: isLockedByOther ? '4 4' : undefined,
              }}
              radius={getRadius(area.peopleAffected)}
              eventHandlers={{
                click: () => onSelectArea(area.id),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900">{area.name}</h3>
                    {isLockedByOther && <span title="Locked" className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">🔒 Locked</span>}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">Priority: <span style={{color: baseColor}} className="font-semibold">{area.priority}</span></p>
                  <p className="text-xs text-slate-700">{area.damageLevel}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Custom Map Overlay for Legend */}
      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 z-[1000] text-sm">
        <h4 className="font-bold text-slate-800 mb-3">Priority Legend</h4>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-80 shadow-sm"></div>
          <span className="text-slate-700 font-medium">High Priority</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80 shadow-sm"></div>
          <span className="text-slate-700 font-medium">Medium Priority</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 rounded-full bg-green-500 opacity-80 shadow-sm"></div>
          <span className="text-slate-700 font-medium">Low Priority</span>
        </div>
        <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-slate-400 opacity-40 border-2 border-slate-500 border-dashed"></div>
          <span className="text-slate-600 font-medium italic">Locked (Assigned)</span>
        </div>
      </div>
    </div>
  );
}
