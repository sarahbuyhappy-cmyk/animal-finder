export enum Habitat {
  SKY = 'sky',
  LAND = 'land',
  WATER = 'water'
}

export interface Animal {
  id: string;
  name: string;
  imageUrl: string; // Changed from emoji to imageUrl
  habitat: Habitat;
}

export interface ZoneConfig {
  id: Habitat;
  label: string;
  icon: string;
  colorClass: string;
  textClass: string;
  borderColor: string;
}