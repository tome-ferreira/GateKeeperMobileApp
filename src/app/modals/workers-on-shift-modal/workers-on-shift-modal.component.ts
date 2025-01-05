import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { FunctionsService } from 'src/app/services/functions.service';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-workers-on-shift-modal',
  templateUrl: './workers-on-shift-modal.component.html',
  styleUrls: ['./workers-on-shift-modal.component.scss'],
})
export class WorkersOnShiftModalComponent  implements OnInit {

  shiftId: any;
  starts: any;
  ends: any;
  workers: any;

  constructor(
    private modalCtrl: ModalController,
    private functions: FunctionsService,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private shiftService: ShiftService
  ) { }

  async ngOnInit() {
    this.shiftId = this.navParams.get('shiftId');
    this.starts = this.navParams.get('starts');
    this.ends = this.navParams.get('ends');

    

    const loading = await this.functions.showLoading();
    await this.getWorkers(this.shiftId, this.starts, this.ends);
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async getWorkers(shiftId: string, starts: Date, ends: Date){
    try{
      this.workers = await this.shiftService.getShiftsWorkers(shiftId, starts.toString(), ends.toString());
    }catch (error){
      await this.functions.presentToast(`Erro ao carregar trabalhadores`, `danger`);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Ausente':
        return 'yellow';
      case 'A trabalhar':
        return 'green';
      case 'Falta':
        return 'red';
      default:
        return 'gray';
    }
  }
}
