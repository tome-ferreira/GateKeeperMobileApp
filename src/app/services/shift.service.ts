import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ShiftHappensInstance } from '../models/shiftHappensInstance.model';
import { WorkerOnShift } from '../models/workerOnShift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private API_URL = 'https://api.gatekeeper.xiscard.eu/api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  getShiftsForRegister(companyId: string){
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
        .get<ShiftHappensInstance[]>(
          `${this.API_URL}Shift/GetShiftsForRegister?companyId=${companyId}`,
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


  getShiftsWorkers(shiftId: string, starts: string, ends: string){
    console.log("shiftId ", shiftId);
    console.log("starts ", starts);
    console.log("ends ", ends);

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
      .get<WorkerOnShift[]>(
        `${this.API_URL}Shift/GetWorkersOfShift?shiftId=${shiftId}&starts=${starts}&ends=${ends}`,
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
}
