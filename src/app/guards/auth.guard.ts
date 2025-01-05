import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isValid = await this.authService.isTokenValid();

    if (isValid) {
      return true; // Permite acesso à rota
    } else {
      console.log('Acesso negado. Redirecionando para login...');
      this.router.navigate(['/login']); // Redireciona para login
      return false; // Bloqueia a rota
    }
  }
}
