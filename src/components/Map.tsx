import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DisasterArea } from '../data/mockData';
import { motion } from 'motion/react';

interface MapProps {
  areas: DisasterArea[];
  selectedAreaId: string | null;
  onSelectArea: (id: string) => void;
}

// Component to handle map center updates when selection changes
function MapUpdater({ selectedArea, areas }: { selectedArea: DisasterArea | undefined, areas: DisasterArea[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedArea) {
      map.flyTo([selectedArea.lat, selectedArea.lng], 8, {
        duration: 1.5,
      });
    } else if (areas.length > 0) {
      // Center on India generally
      map.flyTo([20.5937, 78.9629], 5, {
        duration: 1.5,
      });
    }
  }, [selectedArea, map, areas]);

  return null;
}

export default function Map({ areas, selectedAreaId, onSelectArea }: MapProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ef4444'; // red-500
      case 'Medium': return '#eab308'; // yellow-500
      case 'Low': return '#22c55e'; // green-500
      default: return '#3b82f6'; // blue-500
    }
  };

  const getRadius = (peopleAffected: number) => {
    // Scale radius based on people affected (min 10, max 30)
    const min = 10;
    const max = 35;
    const scaled = (peopleAffected / 50000) * max;
    return Math.max(min, Math.min(scaled, max));
  };

  const selectedArea = areas.find(a => a.id === selectedAreaId);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative z-0">
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        scrollWheelZoom={true}
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
          const color = getPriorityColor(area.priority);
          
          return (
            <CircleMarker
              key={area.id}
              center={[area.lat, area.lng]}
              pathOptions={{
                color: isSelected ? '#000' : color,
                fillColor: color,
                fillOpacity: isSelected ? 0.9 : 0.6,
                weight: isSelected ? 3 : 1,
              }}
              radius={getRadius(area.peopleAffected)}
              eventHandlers={{
                click: () => onSelectArea(area.id),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-slate-900">{area.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">Priority: <span style={{color}} className="font-semibold">{area.priority}</span></p>
                  <p className="text-xs text-slate-700">{area.damageLevel}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      {/* Custom Map Overlay for Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-200 z-[1000] text-xs">
        <h4 className="font-semibold text-slate-800 mb-2">Priority Legend</h4>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
          <span className="text-slate-600">High Priority</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
          <span className="text-slate-600">Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
          <span className="text-slate-600">Low Priority</span>
        </div>
      </div>
    </div>
  );
}
