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
  const getStatusColor = (area: DisasterArea) => {
    if (area.status === 'Completed') return '#9ca3af'; // gray-400
    if (area.status !== 'Pending') {
      if (area.assigneeType === 'NGO') return '#3b82f6'; // blue-500
      if (area.assigneeType === 'Gov') return '#a855f7'; // purple-500
    }
    return '#ef4444'; // red-500 (Pending default)
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
          const color = getStatusColor(area);
          
          return (
            <CircleMarker
              key={area.id}
              center={[area.lat, area.lng]}
              pathOptions={{
                color: isSelected ? '#000' : color,
                fillColor: color,
                fillOpacity: isSelected ? 0.9 : 0.7,
                weight: isSelected ? 3 : 1,
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
                  <p className="text-xs text-slate-500 mb-2">Priority: <span className="font-semibold">{area.priority}</span></p>
                  <p className="text-xs text-slate-700">{area.damageLevel}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Custom Map Overlay for Legend */}
      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 z-[1000] text-sm">
        <h4 className="font-bold text-slate-800 mb-3">Area Status Legend</h4>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-80 shadow-sm"></div>
          <span className="text-slate-700 font-medium">Pending (Default)</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 opacity-80 shadow-sm"></div>
          <span className="text-slate-700 font-medium">Assigned to NGO</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-purple-500 opacity-80 shadow-sm"></div>
          <span className="text-slate-700 font-medium">Assigned to Gov</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gray-400 opacity-80 shadow-sm"></div>
          <span className="text-slate-700 font-medium">Completed</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500 italic">
          Circle size indicates intensity (people affected).
        </div>
      </div>
    </div>
  );
}
