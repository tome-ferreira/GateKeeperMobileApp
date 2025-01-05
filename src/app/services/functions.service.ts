import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

  //Abre o toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000, 
      color: color,
      position: 'bottom', 
    });
    await toast.present();
  }
  //Abre o loading
  async showLoading() {
    const loading = await this.loadingCtrl.create({});
    loading.present();
    return loading; 
  } 
}
