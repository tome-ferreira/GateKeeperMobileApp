import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router, private networkService: NetworkService) {
    this.checkPreferences();
    this.monitorNetwork();
  }

  async checkPreferences() {
    const remember = await this.authService.getRememberUser();
    
    if (remember) {
      const isValid = await this.authService.isTokenValid();
  
      if (isValid) {
        console.log('Usuário autenticado, redirecionando para home...');
        this.router.navigate(['/home']); // Redireciona para a home automaticamente
      } else {
        console.log('Token inválido ou expirado. Redirecionando para login...');
        await this.authService.clearToken(); // Remove o token inválido
        this.router.navigate(['/login']); // Redireciona para login
      }
    } else {
      console.log('Usuário não autenticado, redirecionando para login...');
      this.router.navigate(['/login']); // Redireciona para login
    }
  }

  private lastPage = '';

  monitorNetwork() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.lastPage = event.url; 
      }
    });

    this.networkService.isConnected().subscribe((isConnected) => {
      if (!isConnected) {
        this.router.navigate(['pages/no-connection']);
      } else if (this.lastPage && this.lastPage !== 'pages/no-connection') {
        this.router.navigate([this.lastPage]);
      }
    });
  }
  
}
