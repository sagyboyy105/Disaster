import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
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

  const createCustomIcon = (area: DisasterArea, isSelected: boolean) => {
    const color = getStatusColor(area);
    const radius = getRadius(area.peopleAffected);
    const size = radius * 2;
    
    const html = `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        opacity: ${isSelected ? 0.9 : 0.7};
        border: ${isSelected ? '3px solid #000' : '1px solid ' + color};
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%);
      "></div>
    `;

    return L.divIcon({
      html,
      className: 'custom-marker-icon',
      iconSize: [0, 0], // The div itself handles the sizing and centering via translate
      iconAnchor: [0, 0],
      popupAnchor: [0, -radius]
    });
  };

  const createClusterCustomIcon = function (cluster: any) {
    const count = cluster.getChildCount();
    let size = 40;
    if (count > 5) size = 50;
    if (count > 10) size = 60;

    return L.divIcon({
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: rgba(239, 68, 68, 0.8);
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        ">
          ${count}
        </div>
      `,
      className: 'custom-cluster-icon',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
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

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
        >
          {areas.map((area) => {
            const isSelected = area.id === selectedAreaId;
            const isLockedByOther = area.status !== 'Pending' && area.assignedTo !== currentUserOrg;
            
            return (
              <Marker
                key={area.id}
                position={[area.lat, area.lng]}
                icon={createCustomIcon(area, isSelected)}
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
              </Marker>
            );
          })}
        </MarkerClusterGroup>
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
