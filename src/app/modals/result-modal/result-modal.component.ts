import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { FunctionsService } from 'src/app/services/functions.service';
import { MovementService } from 'src/app/services/movement.service';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
})
export class ResultModalComponent  implements OnInit {
  scannedData: string = "";
  isEntrance: boolean = true;
  id: string = "";
  messageToDisplay: any;
  worker: any;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private functions: FunctionsService,
    private navParams: NavParams,
    private movementService: MovementService
  ) { }

  async ngOnInit() {
    const loading = await this.functions.showLoading();

    try {
      this.scannedData = this.navParams.get('scannedData');
      this.isEntrance = this.navParams.get('isEntrance');
      this.id = this.navParams.get('id');

      await this.postMovement(this.scannedData, this.id, this.isEntrance);

      if (this.messageToDisplay === "Movimento registado") {
        await this.getWorker();
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      this.messageToDisplay = "An error occurred. Please try again.";
    } finally {
      loading.dismiss();
    }
  }

  async getWorker(){
    try{
      this.worker = await this.movementService.getWorker(this.scannedData)
      //console.log(this.worker);
    }
    catch (error) {
      console.error(error);
    }
  }

  async postMovement(link: string, shiftId: string, isEntrance: boolean) {
    try {
      const responseMessage = await this.movementService.postMovement(link, shiftId, isEntrance);
      this.messageToDisplay = responseMessage || 'Erro inesperado';
    } catch (error) {
      console.error(error);
      this.messageToDisplay = "Ocorreu um erro inesperado ao registar o movimento";
    }
  }
  
  
  

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
