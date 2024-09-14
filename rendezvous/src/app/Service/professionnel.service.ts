import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disponibilite } from '../modele/Disponibilite';

@Injectable({
  providedIn: 'root'
})
export class ProfessionnelService {
  private baseUrl = 'http://192.168.141.198:8084/api/Professionnel';
  private apiUrl = 'http://192.168.141.198:8084/api/Disponibilite'; // Remplacez par votre URL d'API
  private baseUrl1 = 'http://192.168.141.198:8084/api/Disponibilite';

  constructor(private http: HttpClient) { }

  planifierAgenda(professionnelId: number, agendaAnnuel: any): Observable<string> {
    const url = `${this.baseUrl}/planifierAgenda/${professionnelId}`;
    return this.http.post<string>(url, agendaAnnuel);
  }

  getDisponibilitesByProfessionnel(idProfessionnel: number): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.apiUrl}/disponibilitespro/${idProfessionnel}`);

  }
  addDisponibilite(professionnelId: number, disponibilite: Disponibilite): Observable<Disponibilite> {
    return this.http.post<Disponibilite>(`${this.apiUrl}/${professionnelId}`, disponibilite);
  }
  editDisponibilite(disponibiliteId: number, disponibilite: Disponibilite): Observable<Disponibilite> {
    return this.http.put<Disponibilite>(`${this.apiUrl}/${disponibiliteId}`, disponibilite);
  }

  deleteDisponibilite(disponibiliteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${disponibiliteId}`);
  }

  getDisponibilitesByDateAndProfessionnel(professionnelId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl1}/by-date/${professionnelId}/${date}`);
  }

}
