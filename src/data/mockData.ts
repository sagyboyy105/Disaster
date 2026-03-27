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
  detailedDescription?: string;
  historicalData?: string[];
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
    detailedDescription: 'The Mithi river has overflowed, submerging ground-floor houses in Kurla and Sion. Local train networks are suspended, and electricity has been preemptively cut to prevent electrocution. Urgent need for inflatable boats and dry rations.',
    historicalData: [
      '2005: Severe floods affected 2M+ people.',
      '2017: Waterlogging caused 3 days of city standstill.',
      '2021: Cyclone Tauktae caused moderate structural damage.'
    ]
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
    detailedDescription: 'Wind speeds up to 120km/h have destroyed temporary settlements along the Marina and Elliot beaches. 400+ fishing boats are damaged. Restoration of the main power grid is expected to take 48 hours.',
    historicalData: [
      '2015: Historic floods displaced over 1.8M people.',
      '2016: Cyclone Vardah caused extensive infrastructure damage.'
    ]
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
    detailedDescription: 'Over 50,000 hectares of agricultural land are underwater. Kaziranga National Park is partially flooded, forcing wildlife to migrate. 15 relief camps have been set up but are currently overcrowded.',
    historicalData: [
      'Annual flooding affects an average of 2M people.',
      '2020: Floods affected 30 out of 33 districts.'
    ]
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
    detailedDescription: 'The storm surge reached 2 meters, causing coastal erosion. Evacuation shelters are intact, but connecting roads are blocked by fallen trees. Tarpaulins and roofing sheets are the primary requirement.',
    historicalData: [
      '1999: Super Cyclone caused unprecedented devastation.',
      '2019: Cyclone Fani caused $8.1 billion in damages.'
    ]
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
    detailedDescription: 'Three major landslides in the Idukki district have cut off 5 villages. The NDRF is on site with heavy machinery. Medical camps are operational, but fresh water supply is contaminated.',
    historicalData: [
      '2018: Worst flooding in a century, 400+ casualties.',
      '2020: Pettimudi landslide claimed 70 lives.'
    ]
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
    detailedDescription: 'The Kosi river catchment area is experiencing slow drainage. Risk of waterborne diseases (cholera, dengue) is rising. Mobile medical units are requested for remote hamlets.',
    historicalData: [
      '2008: Kosi river flood affected 3M+ people.',
      '2017: Flash floods affected 19 districts.'
    ]
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
    detailedDescription: 'A glacial lake outburst flood (GLOF) has washed away the primary suspension bridge in Chamoli. 12 villages are completely isolated. Helicopters are currently the only viable method for supply drops.',
    historicalData: [
      '2013: Kedarnath floods caused massive destruction.',
      '2021: Chamoli disaster damaged two power projects.'
    ]
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
    detailedDescription: 'A 4.5 magnitude tremor was felt. Rapid visual screening of 200+ buildings has been completed. Only 5 buildings require minor retrofitting. No casualties or major injuries reported.',
    historicalData: [
      '2001: Bhuj earthquake (7.7 magnitude) caused widespread devastation.'
    ]
  }
];
