import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../modele/user';
import { Observable, catchError, map } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseurl_register = 'http://localhost:8084/api/auth/signup';
  private baseUrl_auth = 'http://localhost:8084/api/auth';
  private apiUrl = 'http://localhost:8084/api/user';
  private baseUrl = 'http://localhost:8084/api/user'; // Base URL for user-related endpoints
  private apiUr2 = 'http://localhost:8084/api/user/professionnels';
  private changeurl = 'http://localhost:8084/api/user/forgot-password';
  private reseturl = 'http://localhost:8084/api/user';
  private Url = 'http://localhost:8084/api/auth';
  constructor(private http: HttpClient, private router : Router) { }
  
  register(User: any): Observable<any> {
    return this.http.post<User>(`${this.baseurl_register}` ,User)
  }
  

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl_auth}/signin`, { username, password }).pipe(
      map(response => {
        if (response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('roles', JSON.stringify(response.roles));
          localStorage.setItem('userId', response.id.toString()); // Ensure it's stored as a string
          
          if (response.idProfessionnel != null) {
            localStorage.setItem('idProfessionnel', response.idProfessionnel.toString());
          } else {
            console.warn('idProfessionnel is null or undefined');
            localStorage.setItem('idProfessionnel', '');
          }
          return response;
        } else {
          throw new Error("Authentication token not returned by the server");
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error.message || "Failed to login"));
      })
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  public deconnecter(){
    localStorage.removeItem('access_token');
  }
 

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
 
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, user);
  }
  
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
}

getProfessionnels(): Observable<any> {
  return this.http.get<any>(this.apiUr2); 
}

getUserById(userId: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
}



logout() {
  // Remove the token from local storage
  localStorage.removeItem('token');
  localStorage.removeItem('roles');
  localStorage.removeItem('idProfessionnel');
  localStorage.removeItem('userId');

  // Optionally, redirect to the login page
  this.router.navigate(['/login']);
}



forgotPassword(email: string): Observable<string> {
  return this.http.post<string>(this.changeurl, null, {
    params: { email }
  });
}

resetPassword(token: string, password: string): Observable<string> {
  const url = `http://localhost:8084/api/user/reset-password?token=${token}&password=${password}`;
  return this.http.put(url, null, { responseType: 'text' });
}

redirectToGoogle(): void {
  window.location.href = `${this.Url}/auth/redirect`;
}

}
