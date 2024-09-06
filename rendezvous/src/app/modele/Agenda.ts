import { Disponibilite } from "./Disponibilite";

export interface Agenda {
    [date: string]: {
      [dayOfWeek: string]: Disponibilite[];
    };
  }