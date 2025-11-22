import { Animal, Habitat, ZoneConfig } from './types';

export const ANIMALS: Animal[] = [
  // SKY
  { 
    id: '1', 
    name: 'Eagle', 
    imageUrl: 'https://images.unsplash.com/photo-1611689342806-08638005798d?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.SKY 
  },
  { 
    id: '2', 
    name: 'Parrot', 
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb8?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.SKY 
  },
  { 
    id: '3', 
    name: 'Owl', 
    imageUrl: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.SKY 
  },
  { 
    id: '4', 
    name: 'Butterfly', 
    imageUrl: 'https://images.unsplash.com/photo-1557431177-36141475cdd3?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.SKY 
  },

  // LAND
  { 
    id: '6', 
    name: 'Lion', 
    imageUrl: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.LAND 
  },
  { 
    id: '7', 
    name: 'Panda', 
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.LAND 
  },
  { 
    id: '8', 
    name: 'Elephant', 
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.LAND 
  },
  { 
    id: '9', 
    name: 'Rabbit', 
    imageUrl: 'https://images.unsplash.com/photo-1559214369-a6b1d7919865?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.LAND 
  },
  { 
    id: '10', 
    name: 'Tiger', 
    imageUrl: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.LAND 
  },

  // WATER
  { 
    id: '11', 
    name: 'Dolphin', 
    imageUrl: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.WATER 
  },
  { 
    id: '12', 
    name: 'Clownfish', 
    imageUrl: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.WATER 
  },
  { 
    id: '13', 
    name: 'Turtle', 
    imageUrl: 'https://images.unsplash.com/photo-1437622643429-be0ee1e14e29?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.WATER 
  },
  { 
    id: '14', 
    name: 'Jellyfish', 
    imageUrl: 'https://images.unsplash.com/photo-1508852951744-beab03c19b53?auto=format&fit=crop&w=400&q=80', 
    habitat: Habitat.WATER 
  },
];

export const ZONES: ZoneConfig[] = [
  { 
    id: Habitat.SKY, 
    label: '天空 (Sky)', 
    icon: '☁️', 
    colorClass: 'bg-sky-200', 
    textClass: 'text-sky-700',
    borderColor: 'border-sky-300'
  },
  { 
    id: Habitat.LAND, 
    label: '草地 (Land)', 
    icon: '🌿', 
    colorClass: 'bg-green-200', 
    textClass: 'text-green-800',
    borderColor: 'border-green-300'
  },
  { 
    id: Habitat.WATER, 
    label: '水里 (Water)', 
    icon: '🌊', 
    colorClass: 'bg-blue-400', 
    textClass: 'text-blue-900',
    borderColor: 'border-blue-500'
  },
];