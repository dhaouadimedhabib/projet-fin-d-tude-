import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8084/api/paiement'; // URL de votre API

  constructor(private http: HttpClient) {}

  payerRendezVous(token: string, currency: string, idRendezVous: number): Observable<any> {
    const params = new HttpParams()
      .set('token', token)
      .set('currency', currency)
      .set('idRendezVous', idRendezVous.toString());

    return this.http.post<any>(this.apiUrl, null, { params });
  }
  getMontant(idRendezVous: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${idRendezVous}/montant`);
  }
}
