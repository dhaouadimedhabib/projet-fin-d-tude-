import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Service } from '../modele/Services';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://192.168.141.198:8084/api/services';  // URL de base pour les services

  constructor(private http: HttpClient) { }

  getServiceByProfessionnelId(professionnelId: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${professionnelId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Vous pouvez personnaliser le message d'erreur ici si vous le souhaitez
    alert('Please create your own service.');
    console.error('Une erreur est survenue:', error.message);
    return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer plus tard.'));
  }
  
  createService(service: Service, professionnelId: number): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}/${professionnelId}`, service).pipe(
      catchError(this.handleError)
    );
  }


  // Method to update service
  updateService(professionnelId: number, serviceDetails: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${professionnelId}`, serviceDetails).pipe(
      catchError(this.handleError)
    );
  }

}
