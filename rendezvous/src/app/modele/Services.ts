export interface Service {
    serviceId?: number;
    nom: string;
    description: string;
    duree: string; // Use string to represent Duration as ISO 8601 duration format (e.g., 'PT1H30M')
    prix: number;
    professionnel: any;
  
}