export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'Assigned' | 'In Progress' | 'Completed';
export type AssigneeType = 'NGO' | 'Gov';

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
  assigneeType?: AssigneeType;
  description: string;
  detailedDescription?: string;
  historicalData?: string[];
  imageUrls?: string[];
}

export const initialAreas: DisasterArea[] = [
  // Maharashtra
  {
    id: '1', name: 'Mumbai Suburbs', lat: 19.0760, lng: 72.8777, priority: 'High', status: 'Pending',
    damageLevel: 'Severe flooding', peopleAffected: 15000, description: 'Heavy rainfall waterlogging.',
    detailedDescription: 'Mithi river overflowed. Local train networks suspended. Need inflatable boats.',
    historicalData: ['2005: Severe floods affected 2M+ people.'],
    imageUrls: ['https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '1a', name: 'Pune City', lat: 18.5204, lng: 73.8567, priority: 'Medium', status: 'Assigned',
    assigneeType: 'NGO', assignedTo: 'Hope Foundation', damageLevel: 'Moderate flooding', peopleAffected: 5000,
    description: 'Mutha river overflow. Low lying areas flooded.',
    detailedDescription: 'Evacuation of 500 families completed. Need dry rations and medical supplies.',
    historicalData: ['2019: Flash floods caused significant damage.'],
    imageUrls: ['https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '1b', name: 'Nashik District', lat: 19.9975, lng: 73.7898, priority: 'Low', status: 'Pending',
    damageLevel: 'Minor waterlogging', peopleAffected: 2000, description: 'Godavari river levels rising.',
    detailedDescription: 'Preemptive alerts issued. Shelters being prepared.',
    historicalData: ['2008: Godavari floods.'],
    imageUrls: []
  },

  // Tamil Nadu
  {
    id: '2', name: 'Chennai Coastal', lat: 13.0827, lng: 80.2707, priority: 'High', status: 'Assigned',
    assigneeType: 'Gov', assignedTo: 'NDRF South', damageLevel: 'Cyclone damage', peopleAffected: 22000,
    description: 'Cyclone uprooted trees and damaged power lines.',
    detailedDescription: 'Wind speeds up to 120km/h. 400+ fishing boats damaged. Restoration of power grid ongoing.',
    historicalData: ['2015: Historic floods displaced over 1.8M people.'],
    imageUrls: ['https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '2a', name: 'Madurai Rural', lat: 9.9252, lng: 78.1198, priority: 'Medium', status: 'Pending',
    damageLevel: 'Crop destruction', peopleAffected: 8000, description: 'Heavy unseasonal rains damaged crops.',
    detailedDescription: 'Paddy fields submerged. Farmers need immediate financial and material assistance.',
    historicalData: ['Frequent drought and occasional flood cycles.'],
    imageUrls: []
  },
  {
    id: '2b', name: 'Coimbatore Hills', lat: 11.0168, lng: 76.9558, priority: 'Medium', status: 'In Progress',
    assigneeType: 'NGO', assignedTo: 'Green Earth', damageLevel: 'Landslides', peopleAffected: 3500,
    description: 'Minor landslides blocking hill roads.',
    detailedDescription: 'Clearing operations underway. Two villages isolated.',
    historicalData: [],
    imageUrls: ['https://images.unsplash.com/photo-1542082873-c1d88207eb27?auto=format&fit=crop&w=400&q=80']
  },

  // Assam
  {
    id: '3', name: 'Assam Valley', lat: 26.2006, lng: 92.9376, priority: 'High', status: 'Pending',
    damageLevel: 'River overflow', peopleAffected: 45000, description: 'Brahmaputra river overflow.',
    detailedDescription: 'Over 50,000 hectares of agricultural land underwater. Kaziranga National Park partially flooded.',
    historicalData: ['Annual flooding affects an average of 2M people.'],
    imageUrls: ['https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '3a', name: 'Guwahati Urban', lat: 26.1445, lng: 91.7362, priority: 'High', status: 'Assigned',
    assigneeType: 'Gov', assignedTo: 'SDRF Assam', damageLevel: 'Urban flooding', peopleAffected: 12000,
    description: 'Severe waterlogging in city centers.',
    detailedDescription: 'Drainage systems overwhelmed. Rescue boats deployed in residential areas.',
    historicalData: ['2022: Severe urban floods.'],
    imageUrls: []
  },
  {
    id: '3b', name: 'Dibrugarh', lat: 27.4728, lng: 94.9120, priority: 'Medium', status: 'Pending',
    damageLevel: 'Erosion', peopleAffected: 6000, description: 'River bank erosion threatening homes.',
    detailedDescription: 'Immediate need for sandbags and temporary relocation of 200 families.',
    historicalData: ['Continuous erosion issues over decades.'],
    imageUrls: []
  },

  // Odisha
  {
    id: '4', name: 'Odisha Coast', lat: 20.9517, lng: 85.0985, priority: 'Medium', status: 'Pending',
    damageLevel: 'Moderate wind damage', peopleAffected: 8000, description: 'Coastal areas affected by high-speed winds.',
    detailedDescription: 'Storm surge reached 2 meters. Evacuation shelters intact, connecting roads blocked.',
    historicalData: ['1999: Super Cyclone caused unprecedented devastation.'],
    imageUrls: ['https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '4a', name: 'Puri District', lat: 19.8135, lng: 85.8312, priority: 'High', status: 'In Progress',
    assigneeType: 'Gov', assignedTo: 'NDRF East', damageLevel: 'Severe cyclone impact', peopleAffected: 18000,
    description: 'Direct hit by cyclone. Extensive structural damage.',
    detailedDescription: 'Power grid completely down. Communication lines severed. Relief camps established.',
    historicalData: ['2019: Cyclone Fani.'],
    imageUrls: []
  },

  // Kerala
  {
    id: '5', name: 'Kerala Highlands', lat: 10.8505, lng: 76.2711, priority: 'Medium', status: 'In Progress',
    assigneeType: 'NGO', assignedTo: 'Hope Foundation', damageLevel: 'Landslides', peopleAffected: 5000,
    description: 'Heavy rains triggered landslides blocking major arterial roads.',
    detailedDescription: 'Three major landslides in Idukki district. NDRF on site with heavy machinery.',
    historicalData: ['2018: Worst flooding in a century, 400+ casualties.'],
    imageUrls: ['https://images.unsplash.com/photo-1542082873-c1d88207eb27?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '5a', name: 'Kochi Urban', lat: 9.9312, lng: 76.2673, priority: 'Low', status: 'Completed',
    assigneeType: 'Gov', assignedTo: 'City Corp', damageLevel: 'Waterlogging', peopleAffected: 2000,
    description: 'Waterlogging cleared. Normalcy restored.',
    detailedDescription: 'Pumps deployed to clear low-lying areas. Disinfection drives completed.',
    historicalData: ['2018: Airport flooded.'],
    imageUrls: []
  },
  {
    id: '5b', name: 'Wayanad Hills', lat: 11.6854, lng: 76.1320, priority: 'High', status: 'Pending',
    damageLevel: 'Severe Landslides', peopleAffected: 7500, description: 'Multiple landslides reported.',
    detailedDescription: 'Plantation workers trapped. Immediate airlift rescue requested.',
    historicalData: ['2019: Puthumala landslide.'],
    imageUrls: []
  },
  {
    id: '5c', name: 'Alappuzha Backwaters', lat: 9.4981, lng: 76.3388, priority: 'High', status: 'Assigned',
    assigneeType: 'Gov', assignedTo: 'SDRF Kerala', damageLevel: 'Severe Flooding', peopleAffected: 15000,
    description: 'Houseboats damaged, low-lying areas completely submerged.',
    detailedDescription: 'Need immediate evacuation boats and drinking water.',
    historicalData: ['Prone to annual monsoon flooding.'],
    imageUrls: []
  },
  {
    id: '5d', name: 'Thiruvananthapuram Coast', lat: 8.5241, lng: 76.9366, priority: 'Medium', status: 'Pending',
    damageLevel: 'Coastal Erosion', peopleAffected: 3000, description: 'High tidal waves damaging coastal homes.',
    detailedDescription: 'Sea walls breached in multiple locations. Temporary shelters needed.',
    historicalData: ['Ockhi cyclone impact in 2017.'],
    imageUrls: []
  },
  {
    id: '5e', name: 'Munnar Plantations', lat: 10.0889, lng: 77.0595, priority: 'High', status: 'Pending',
    damageLevel: 'Mudslides', peopleAffected: 4200, description: 'Tea estates isolated due to road washouts.',
    detailedDescription: 'Communication lines down. Airdrop of essential supplies required.',
    historicalData: ['2018 floods caused massive damage to tourism infrastructure.'],
    imageUrls: []
  },
  {
    id: '5f', name: 'Thrissur Town', lat: 10.5276, lng: 76.2144, priority: 'Low', status: 'In Progress',
    assigneeType: 'NGO', assignedTo: 'Green Earth', damageLevel: 'Urban Waterlogging', peopleAffected: 1500,
    description: 'Drainage overflow affecting markets.',
    detailedDescription: 'Pumping operations ongoing. Health camps being set up to prevent epidemics.',
    historicalData: [],
    imageUrls: []
  },
  {
    id: '5g', name: 'Palakkad Gap', lat: 10.7867, lng: 76.6548, priority: 'Medium', status: 'Pending',
    damageLevel: 'Crop Damage', peopleAffected: 8000, description: 'Paddy fields inundated.',
    detailedDescription: 'Farmers reporting 100% crop loss in low-lying areas. Assessment teams needed.',
    historicalData: [],
    imageUrls: []
  },

  // Maharashtra (Adding more)
  {
    id: '1c', name: 'Ratnagiri Coast', lat: 16.9902, lng: 73.3120, priority: 'High', status: 'Assigned',
    assigneeType: 'Gov', assignedTo: 'NDRF West', damageLevel: 'Cyclone Impact', peopleAffected: 12000,
    description: 'Coastal villages facing severe storm surge.',
    detailedDescription: 'Evacuation to higher ground in progress. Power lines down.',
    historicalData: ['Cyclone Nisarga (2020)'],
    imageUrls: []
  },
  {
    id: '1d', name: 'Kolhapur Floods', lat: 16.7050, lng: 74.2433, priority: 'High', status: 'Pending',
    damageLevel: 'River Overflow', peopleAffected: 25000, description: 'Panchganga river crossed danger mark.',
    detailedDescription: 'Highway submerged. Need boats for rescue operations immediately.',
    historicalData: ['2019 severe floods.'],
    imageUrls: []
  },
  {
    id: '1e', name: 'Thane Urban', lat: 19.2183, lng: 72.9781, priority: 'Medium', status: 'In Progress',
    assigneeType: 'NGO', assignedTo: 'Health First', damageLevel: 'Waterlogging', peopleAffected: 6000,
    description: 'Residential complexes flooded.',
    detailedDescription: 'Providing clean water and medical kits to stranded residents.',
    historicalData: [],
    imageUrls: []
  },

  // Tamil Nadu (Adding more)
  {
    id: '2c', name: 'Cuddalore Coast', lat: 11.7480, lng: 79.7714, priority: 'High', status: 'Pending',
    damageLevel: 'Storm Surge', peopleAffected: 18000, description: 'Sea water entered coastal villages.',
    detailedDescription: 'Immediate need for relief camps and food packets.',
    historicalData: ['2004 Tsunami impact, frequent cyclones.'],
    imageUrls: []
  },
  {
    id: '2d', name: 'Kanyakumari Tip', lat: 8.0883, lng: 77.5385, priority: 'Medium', status: 'Assigned',
    assigneeType: 'Gov', assignedTo: 'State Police', damageLevel: 'High Winds', peopleAffected: 4000,
    description: 'Fishing harbor damaged.',
    detailedDescription: 'Securing boats and assessing structural damage to piers.',
    historicalData: ['Cyclone Ockhi (2017)'],
    imageUrls: []
  },

  // Assam (Adding more)
  {
    id: '3c', name: 'Majuli Island', lat: 26.9545, lng: 94.1683, priority: 'High', status: 'Pending',
    damageLevel: 'Severe Erosion & Flooding', peopleAffected: 20000, description: 'Island shrinking due to erosion, currently flooded.',
    detailedDescription: 'Ferry services suspended. Need airdrops of supplies.',
    historicalData: ['Continuous loss of landmass over decades.'],
    imageUrls: []
  },
  {
    id: '3d', name: 'Silchar', lat: 24.8333, lng: 92.7789, priority: 'Medium', status: 'In Progress',
    assigneeType: 'NGO', assignedTo: 'Hope Foundation', damageLevel: 'Urban Flooding', peopleAffected: 8000,
    description: 'Barak river overflowed into city.',
    detailedDescription: 'Distributing relief materials in waterlogged neighborhoods.',
    historicalData: ['2022 devastating floods.'],
    imageUrls: []
  },

  // Bihar (Adding more)
  {
    id: '6b', name: 'Darbhanga', lat: 26.1542, lng: 85.8918, priority: 'High', status: 'Pending',
    damageLevel: 'Massive Flooding', peopleAffected: 35000, description: 'Bagmati river breached embankments.',
    detailedDescription: 'Hundreds of villages inundated. Urgent need for rescue boats and tarpaulins.',
    historicalData: ['Annual flood zone.'],
    imageUrls: []
  },
  {
    id: '6c', name: 'Muzaffarpur', lat: 26.1197, lng: 85.3910, priority: 'Medium', status: 'Assigned',
    assigneeType: 'Gov', assignedTo: 'SDRF Bihar', damageLevel: 'Flooding', peopleAffected: 12000,
    description: 'Burhi Gandak river overflow.',
    detailedDescription: 'Evacuation to high-rise schools and shelters ongoing.',
    historicalData: [],
    imageUrls: []
  },

  // Uttarakhand (Adding more)
  {
    id: '7a', name: 'Rishikesh', lat: 30.0869, lng: 78.2676, priority: 'Medium', status: 'Pending',
    damageLevel: 'River Swelling', peopleAffected: 2000, description: 'Ganges flowing above danger mark.',
    detailedDescription: 'Ghats submerged. Advisories issued to ashrams and hotels near banks.',
    historicalData: [],
    imageUrls: []
  },
  {
    id: '7b', name: 'Pithoragarh', lat: 29.5829, lng: 80.2182, priority: 'High', status: 'In Progress',
    assigneeType: 'Gov', assignedTo: 'Border Roads Org', damageLevel: 'Landslides', peopleAffected: 1500,
    description: 'Border roads blocked by massive landslides.',
    detailedDescription: 'Clearing operations critical for supply lines. Villages cut off.',
    historicalData: ['Frequent monsoon landslides.'],
    imageUrls: []
  },

  // Gujarat (Adding more)
  {
    id: '8a', name: 'Surat City', lat: 21.1702, lng: 72.8311, priority: 'Medium', status: 'Pending',
    damageLevel: 'Urban Flooding', peopleAffected: 10000, description: 'Tapi river water release causing waterlogging.',
    detailedDescription: 'Low lying areas evacuated. Pumps deployed.',
    historicalData: ['2006 devastating floods.'],
    imageUrls: []
  },
  {
    id: '8b', name: 'Saurashtra Coast', lat: 21.5222, lng: 70.4579, priority: 'High', status: 'Assigned',
    assigneeType: 'Gov', assignedTo: 'NDRF West', damageLevel: 'Cyclone Warning', peopleAffected: 50000,
    description: 'Severe cyclonic storm approaching.',
    detailedDescription: 'Mass evacuation of coastal villages underway. Ports secured.',
    historicalData: ['1998 Gujarat cyclone.'],
    imageUrls: []
  }
];
