import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginInfo } from 'src/app/models/login-info.model';

import { FunctionsService } from 'src/app/services/functions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/models/user-info.model';
import { CompanyService } from 'src/app/services/company.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  rememberUser: boolean = false;
  form: FormGroup = this.formBuilder.group({});;
  newUser: UserInfo = {name: '', email: '', roles: [], token: '', id: ''};
  credentials: LoginInfo = { Email: '', Password: '' };

  networkstatus: string = 'Waiting';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private functions: FunctionsService, private companyService: CompanyService) {
    this.setUpForm();

    const checkNetworkStatus = async () => {
      const status = await Network.getStatus();
      console.log('Network status:', status.connected ? 'Connected' : 'Disconnected');
      if(status.connected){
        this.networkstatus = 'Connected';
      }else{
        this.networkstatus = 'Disconnected';
      }
    };
    
    checkNetworkStatus();
  }

  setUpForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  async saveForm(){
    if(this.form.valid) { 
      await this.login(this.form);
      return;
    }
    await this.functions.presentToast(`Invalid form data!`, 'danger');
    return;
  }

  async login(form: FormGroup) {
    var credentials = form.value;
    const loading = await this.functions.showLoading();
    
    this.authService.login(credentials).subscribe({
      next: async (response) => {

        await this.authService.setToken(response.token);
        console.log('Login bem sucedido ', response);
        await this.authService.setRememberUser(this.rememberUser);
        loading.dismiss();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        loading.dismiss();
        this.functions.presentToast('Tentativa de login inválida!', 'dnager');
      },
    });

    
  }
}
