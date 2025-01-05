import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AbsenceJustification } from '../models/absenseJustification.model';


@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private API_URL = 'https://api.gatekeeper.xiscard.eu/api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getAbsenceJustifications(companyId: string) {
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
        .get<AbsenceJustification[]>(
          `${this.API_URL}Absense/GetAbsencesJus?companyId=${companyId}`,
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


  postAbsenceJustifications(start: string, end: string, justification: string, status: string, companyId: string) {
    return this.authService.getToken().then((token: string) => {
      if (!token) {
        this.router.navigate(['/pages/login']); // Redirect to login if no token
        return Promise.reject('No token available. Redirecting to login...');
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, // Attach the token
        'Content-Type': 'application/json',
      });
  
     
  
      return this.http
        .post<AbsenceJustification>(
          `${this.API_URL}Absense/PostAbsencesJus?start=${start}&end=${end}&justification=${justification}&status=${status}&companyId=${companyId}`,
          null, // Pass the body object here
          { headers } // Attach headers here
        )
        .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            // Redirect to login on unauthorized error
            this.router.navigate(['/pages/login']);
            console.error('Unauthorized. Redirecting to login...');
          }
          throw error; // Re-throw the error for further handling
        });
    });
  }


  putAbsenceJustifications(start: string, end: string, justification: string, status: string, companyId: string, id: string) {
    return this.authService.getToken().then((token: string) => {
      if (!token) {
        this.router.navigate(['/pages/login']); // Redirect to login if no token
        return Promise.reject('No token available. Redirecting to login...');
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, // Attach the token
        'Content-Type': 'application/json',
      });
  
     
  
      return this.http
        .put<AbsenceJustification>(
          `${this.API_URL}Absense/PutAbsencesJus?start=${start}&end=${end}&justification=${justification}&status=${status}&companyId=${companyId}&id=${id}`,
          null, // Pass the body object here
          { headers } // Attach headers here
        )
        .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            // Redirect to login on unauthorized error
            this.router.navigate(['/pages/login']);
            console.error('Unauthorized. Redirecting to login...');
          }
          throw error; // Re-throw the error for further handling
        });
    });
  }




  deleteAbsenceJustifications(id: string) {
    return this.authService.getToken().then((token: string) => {
      if (!token) {
        this.router.navigate(['/pages/login']); // Redirect to login if no token
        return Promise.reject('No token available. Redirecting to login...');
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, // Attach the token
        'Content-Type': 'application/json',
      });
  
     
  
      return this.http
        .delete<AbsenceJustification>(
          `${this.API_URL}Absense/DeleteAbsencesJus?id=${id}`,
          { headers } // Attach headers here
        )
        .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            // Redirect to login on unauthorized error
            this.router.navigate(['/pages/login']);
            console.error('Unauthorized. Redirecting to login...');
          }
          throw error; // Re-throw the error for further handling
        });
    });
  }
  
}
