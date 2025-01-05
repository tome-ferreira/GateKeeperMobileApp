import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LoginInfo } from '../models/login-info.model';
import { UserInfo } from '../models/user-info.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_KEY = 'jwt-token';
  private REMEMBER_KEY = 'remember-user';
  private COMPANY_KEY = 'company-info';

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }
 
  //private API_URL = 'https://localhost:7220/api/';
  private API_URL = 'https://api.gatekeeper.xiscard.eu/api/';
  async init() {
    await this.storage.create();
  }

  // Token methods
  async setToken(token: string) {
    await this.storage.set(this.TOKEN_KEY, token);
  }

  public async getToken() {
    return await this.storage.get(this.TOKEN_KEY);
  }

  async clearToken() {
    await this.storage.remove(this.TOKEN_KEY);
  }

  // Preference methods
  async setRememberUser(remember: boolean) {
    await this.storage.set(this.REMEMBER_KEY, remember);
  }

  async getRememberUser() {
    return await this.storage.get(this.REMEMBER_KEY);
  }

  async clearPreferences() {
    await this.storage.remove(this.REMEMBER_KEY);
  }

  /*
  // Company methods
  async setCompany(company: any, rememberUser: boolean) {
    if (rememberUser) {
      // Save permanently if "Remember Me" is selected
      await this.storage.set(this.COMPANY_KEY, company);
    } else {
      // Save in memory only for the current session
      sessionStorage.setItem(this.COMPANY_KEY, JSON.stringify(company));
    }
  }

  async getCompany() {
    const rememberUser = await this.getRememberUser();
    if (rememberUser) {
      return await this.storage.get(this.COMPANY_KEY);
    } else {
      const company = sessionStorage.getItem(this.COMPANY_KEY);
      return company ? JSON.parse(company) : null;
    }
  }

  async clearCompany() {
    await this.storage.remove(this.COMPANY_KEY);
    sessionStorage.removeItem(this.COMPANY_KEY);
  }*/



  login(credentials: LoginInfo) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var response = this.http.post<LoginResponse>(`${this.API_URL}Account/Login`, credentials, { headers });
    return response;
  }

  async isTokenValid(): Promise<boolean> {
    const token = await this.getToken();
  
    if (!token) {
      return false; // Não há token para validar
    }
  
    try {
      //  chamada à API para validar o token
      const response = await fetch(`${this.API_URL}Account/validate-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
        },
      });
  
      if (response.ok) {
        return true; // O token é válido
      } else {
        return false; // O token foi rejeitado
      }
    } catch (error) {
      return false;
    }
  }
  
}
