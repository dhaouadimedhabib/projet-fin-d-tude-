import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../modele/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl = 'http://192.168.56.10:8084/api/reclamation';

  constructor(private http: HttpClient) {}

  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.baseUrl}/add`, reclamation);
  }
}
