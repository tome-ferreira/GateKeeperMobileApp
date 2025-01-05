import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { FunctionsService } from 'src/app/services/functions.service';
import { ResultModalComponent } from '../result-modal/result-modal.component';

@Component({
  selector: 'app-reader-modal',
  templateUrl: './reader-modal.component.html',
  styleUrls: ['./reader-modal.component.scss'],
})
export class ReaderModalComponent  implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  id: string = "";
  link: string = "";


  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private functions: FunctionsService,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    this.id = this.navParams.get('id');
    this.link = this.navParams.get('link').link;
  }

  async scan(isEntrance: boolean): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    
    if (barcodes.length > 0) {
      const result = barcodes[0].rawValue; 
      await this.modalCtrl.dismiss(); 
      this.openResultModal(result, isEntrance); 
    } else {
      alert('No barcode detected.');
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async Test(){
    this.openResultModal("asias", true); 
  }

  async myEntrance(){
    console.log("Link: ", this.link);
    
    this.openResultModal(this.link, true);
  }

  async myExit(){
    this.openResultModal(this.link.toString(), false);
  }

  async openResultModal(scannedData: string, isEntrance: boolean): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ResultModalComponent,
      componentProps: {
        scannedData: scannedData,
        isEntrance: isEntrance,
        id: this.id
      },
    });
    await modal.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
