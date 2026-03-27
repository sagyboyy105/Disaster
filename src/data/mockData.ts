export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'Assigned' | 'In Progress' | 'Completed';

export interface DisasterArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  priority: Priority;
  status: Status;
  damageLevel: string;
  peopleAffected: number;
  assignedTo?: string;
  description: string;
}

export const initialAreas: DisasterArea[] = [
  {
    id: '1',
    name: 'Mumbai Suburbs',
    lat: 19.0760,
    lng: 72.8777,
    priority: 'High',
    status: 'Pending',
    damageLevel: 'Severe flooding, infrastructure damage',
    peopleAffected: 15000,
    description: 'Heavy rainfall has caused severe waterlogging in low-lying areas. Immediate medical and food supplies needed.',
  },
  {
    id: '2',
    name: 'Chennai Coastal',
    lat: 13.0827,
    lng: 80.2707,
    priority: 'High',
    status: 'Assigned',
    damageLevel: 'Cyclone damage, power outages',
    peopleAffected: 22000,
    assignedTo: 'Global Relief NGO',
    description: 'Recent cyclone has uprooted trees and damaged power lines. Rehabilitation of coastal homes required.',
  },
  {
    id: '3',
    name: 'Assam Valley',
    lat: 26.2006,
    lng: 92.9376,
    priority: 'High',
    status: 'Pending',
    damageLevel: 'River overflow, crop destruction',
    peopleAffected: 45000,
    description: 'Brahmaputra river overflow has submerged several villages. Need boats for rescue and temporary shelters.',
  },
  {
    id: '4',
    name: 'Odisha Coast',
    lat: 20.9517,
    lng: 85.0985,
    priority: 'Medium',
    status: 'Pending',
    damageLevel: 'Moderate wind damage',
    peopleAffected: 8000,
    description: 'Coastal areas affected by high-speed winds. Roof damages reported. Need construction materials.',
  },
  {
    id: '5',
    name: 'Kerala Highlands',
    lat: 10.8505,
    lng: 76.2711,
    priority: 'Medium',
    status: 'In Progress',
    damageLevel: 'Landslides, road blockages',
    peopleAffected: 5000,
    assignedTo: 'Hope Foundation',
    description: 'Heavy rains triggered landslides blocking major arterial roads. Earthmoving equipment deployed.',
  },
  {
    id: '6',
    name: 'Bihar Plains',
    lat: 25.0961,
    lng: 85.3131,
    priority: 'Low',
    status: 'Pending',
    damageLevel: 'Waterlogging',
    peopleAffected: 3000,
    description: 'Slow receding flood waters. Need water purification tablets and basic medical camps.',
  },
  {
    id: '7',
    name: 'Uttarakhand Hills',
    lat: 30.0668,
    lng: 79.0193,
    priority: 'Medium',
    status: 'Pending',
    damageLevel: 'Flash floods, bridge collapse',
    peopleAffected: 4500,
    description: 'A local bridge collapsed due to sudden flash floods. Villages cut off. Need aerial supply drops.',
  },
  {
    id: '8',
    name: 'Gujarat Kutch',
    lat: 23.7337,
    lng: 69.8597,
    priority: 'Low',
    status: 'Completed',
    damageLevel: 'Minor earthquake tremors',
    peopleAffected: 1000,
    assignedTo: 'Govt Disaster Response',
    description: 'Minor structural cracks reported. Structural integrity assessments completed.',
  }
];
