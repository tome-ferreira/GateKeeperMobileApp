import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetCompaniesResponse } from '../models/getCompaniesResponse.model';



@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    
  }

  
  private API_URL = 'https://api.gatekeeper.xiscard.eu/api/';

  getCompanies() {
    return this.authService.getToken().then((token: string) => {
      if (!token) {
        this.router.navigate(['/pages/login']); // Redirect to login if no token
        return Promise.reject('No token available. Redirecting to login...');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Attach the token
        'Content-Type': 'application/json',
      });
  
      return this.http
        .get<GetCompaniesResponse[]>(`${this.API_URL}Company/GetCompanies`, { headers })
        .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            // Redirect to login on unauthorized error
            this.router.navigate(['/pages/login']);
            console.error('Unauthorized. Redirecting to login...');
          } else {
            console.error('Error fetching companies:', error);
          }
          throw error; // Re-throw the error for further handling
        });
    });
}
}








