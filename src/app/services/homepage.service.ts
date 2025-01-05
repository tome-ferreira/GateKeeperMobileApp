import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ShiftInTimeTable } from '../models/shiftInTimeTable.modal';
import { Link } from '../models/link.model';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  //private API_URL = 'https://localhost:7220/api/';
  private API_URL = 'https://api.gatekeeper.xiscard.eu/api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  getShifts(date: Date, companyId: string) {
    return this.authService.getToken().then((token: string) => {
      if (!token) {
        this.router.navigate(['/pages/login']); // Redirect to login if no token
        return Promise.reject('No token available. Redirecting to login...');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Attach the token
        'Content-Type': 'application/json',
      });
  
      // 
      const formattedDate = date.toISOString().split('.')[0]; 
  
      return this.http
        .get<ShiftInTimeTable[]>(
          `${this.API_URL}HomePage/GetDayTimeTable?date=${formattedDate}&companyId=${companyId}`,
          { headers }
        )
        .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            // Redirect to login on unauthorized error
            this.router.navigate(['/pages/login']);
            console.error('Unauthorized. Redirecting to login...');
          } else {
            console.error('Error fetching absence justifications:', error);
          }
          throw error; // Re-throw the error for further handling
        });
    });
  }

  getUserLink(companyId: string){
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
        .get<Link>(
          `${this.API_URL}HomePage/GetUserLink?companyId=${companyId}`,
          { headers },
          
        )
        .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            // Redirect to login on unauthorized error
            this.router.navigate(['/pages/login']);
            console.error('Unauthorized. Redirecting to login...');
          } else {
            console.error('Error fetching absence justifications:', error);
          }
          throw error; // Re-throw the error for further handling
        });
    });
  }
  
}
