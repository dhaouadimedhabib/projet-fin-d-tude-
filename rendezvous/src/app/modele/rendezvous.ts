import { Time } from "@angular/common";

export interface RendezVous {
  appointmentId?:number;
    date: Date; // LocalDate correspond à Date en JavaScript/TypeScript
    debut:Time; // LocalTime comme chaîne formatée
    fin: Time; // Idem
    statuts: string; // Pour un statut, on peut utiliser une chaîne, enum, ou autre
    nomClient:String;
  }

