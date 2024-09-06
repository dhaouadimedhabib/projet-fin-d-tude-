import { Role } from '../modele/role';
export class User {
  userId?:number;
    username!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    numeroTel!: string;
    image!: string;
    role!: Role[]; // Utilisez l'énumération Role ici
    professionnelId?: number;
  }