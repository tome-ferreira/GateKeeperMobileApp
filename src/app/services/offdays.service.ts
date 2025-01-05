import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { OffdayRequest } from '../models/offdayRequest.model';

@Injectable({
  providedIn: 'root'
})
export class OffdaysService {

  private API_URL = 'https://api.gatekeeper.xiscard.eu/api/';
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}


  getOffdayRequests(companyId: string) {
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
      .get<OffdayRequest[]>(
        `${this.API_URL}Offday/GetOffdayRes?companyId=${companyId}`,
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


  postOffdayRequests(start: string, end: string, notes: string, status: string, companyId: string) {
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
              .post<OffdayRequest>(
                `${this.API_URL}Offday/PostOffdayRes?start=${start}&end=${end}&notes=${notes}&status=${status}&companyId=${companyId}`,
                null, 
                { headers } 
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



  putOffdayRequests(start: string, end: string, notes: string, status: string, companyId: string, id: string) {
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
          .put<OffdayRequest>(
            `${this.API_URL}Offday/PutOffdayRes?start=${start}&end=${end}&notes=${notes}&status=${status}&companyId=${companyId}&id=${id}`,
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



  deleteOffdayRequests(id: string) {
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
          .delete<OffdayRequest>(
            `${this.API_URL}Offday/DeleteOffdayRes?id=${id}`,
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
