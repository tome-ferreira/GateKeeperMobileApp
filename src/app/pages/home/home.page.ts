import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GetCompaniesResponse } from 'src/app/models/getCompaniesResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token: any;
  companies:  any;
  private apiUrl = 'https://localhost:7220/api';

  constructor(private authService: AuthService, private companyService: CompanyService, private router: Router, private http: HttpClient, ) {
    this.loadCompany();
  }

  
  async loadCompany() {
    try {
        this.companies = await this.companyService.getCompanies();
        //console.log('Retrieved companies:', this.companies);
        
        if (this.companies && this.companies.length === 1) {
          const companyId = this.companies[0].id; 
          await this.goToMain(companyId); 
        }
      } catch (error) {
        console.error('Error retrieving companies:', error);
      }
  }

  
  async goToMain(companyId? : string){
    this.router.navigate(['/main', companyId]);
  }


  async logout() {
    await this.authService.clearToken();
    await this.authService.clearPreferences();
    //await this.authService.clearCompany(); 
    this.router.navigate(['/login']); 
  }
}



