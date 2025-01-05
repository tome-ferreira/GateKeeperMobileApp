import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Movement } from '../models/movement.model';
import { WorkerInfo } from '../models/workerInformation.modal';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  //private API_URL = 'https://localhost:7220/api/';
  private API_URL = 'https://api.gatekeeper.xiscard.eu/api/';
  isEntranceStg: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }


  postMovement(link: string, shiftId: string, isEntrance: boolean){
    if(isEntrance){
      this.isEntranceStg="true";
    }else{
      this.isEntranceStg="false";
    }

    return this.authService.getToken().then((token: string ) => {
      if (!token) {
        this.router.navigate(['/pages/login']); // Redirect to login if no token
        return Promise.reject('No token available. Redirecting to login...');
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, // Attach the token
        'Content-Type': 'application/json',
      });
  
      return this.http
        .post<string>(
          `${this.API_URL}Movement/PostMovement?link=${link}&shiftId=${shiftId}&isEntrance=${this.isEntranceStg}`,
          null,
          { headers, responseType: 'text' as 'json' } // Expecting a plain text response
        )
        .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            this.router.navigate(['/pages/login']); // Redirect to login on unauthorized error
            console.error('Unauthorized. Redirecting to login...');
          }
          throw error; // Re-throw the error for further handling
        });
    });
  }

  getWorker(link: string){
    return this.authService.getToken().then((token: string ) => {
      if (!token) {
        this.router.navigate(['/pages/login']); // Redirect to login if no token
        return Promise.reject('No token available. Redirecting to login...');
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, // Attach the token
        'Content-Type': 'application/json',
      });

      return this.http
    .get<WorkerInfo>(
      `${this.API_URL}Movement/GetWorker?link=${link}`,
      { headers } 
    )
    .toPromise()
        .catch((error) => {
          if (error.status === 401) {
            this.router.navigate(['/pages/login']); // Redirect to login on unauthorized error
            console.error('Unauthorized. Redirecting to login...');
          }
          throw error; // Re-throw the error for further handling
        });
  
    });
  }
  
  
}
