import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { CreateAbsenseJustificationModalComponent } from 'src/app/modals/create-absense-justification-modal/create-absense-justification-modal.component';
import { CreateOffdayVacationRequestModalComponent } from 'src/app/modals/create-offday-vacation-request-modal/create-offday-vacation-request-modal.component';
import { EditAbsenseJustificationModalComponent } from 'src/app/modals/edit-absense-justification-modal/edit-absense-justification-modal.component';
import { EditOffdayVacationRequestModalComponent } from 'src/app/modals/edit-offday-vacation-request-modal/edit-offday-vacation-request-modal.component';
import { WorkersOnShiftModalComponent } from 'src/app/modals/workers-on-shift-modal/workers-on-shift-modal.component';
import { AbsenceJustification } from 'src/app/models/absenseJustification.model';
import { OffdayRequest } from 'src/app/models/offdayRequest.model';
import { ShiftHappensInstance } from 'src/app/models/shiftHappensInstance.model';
import { AbsenceService } from 'src/app/services/absense.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { OffdaysService } from 'src/app/services/offdays.service';
import { ShiftService } from 'src/app/services/shift.service';
import { Network } from '@capacitor/network';
import { ReaderModalComponent } from 'src/app/modals/reader-modal/reader-modal.component';
import { HomepageService } from 'src/app/services/homepage.service';
import { DigitalCardComponent } from 'src/app/modals/digital-card/digital-card.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  companyId: string = '';
  absenseJus: any;
  offdayRes: any;
  shiftsForRegister: any;
  shiftsOnTimeTable: any;
  momentDateTime: Date;
  today: Date;
  userLink: any;

  constructor(
    private route: ActivatedRoute, 
    private absenseService: AbsenceService, 
    private offdaysService: OffdaysService,
    private shiftService: ShiftService,
    private homePageService: HomepageService,
    private functions: FunctionsService,
    private loadingCtrl: LoadingController, 
    private modalCtrl : ModalController
  ){
    this.momentDateTime = new Date();
    this.today = new Date();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({});
    loading.present();
    return loading; 
  }


  async ngOnInit() {
    const loading = await this.showLoading();
  
    this.route.params.subscribe(async (params) => {
      // Assign companyId from route parameters
      this.companyId = params['companyId'];
  
      // Check if companyId is valid
      if (!this.companyId) {
        await this.functions.presentToast('Company ID is missing', 'danger');
        loading.dismiss();
        return;
      }
  
      //console.log('Received companyId:', this.companyId);
  
      // Load data only after companyId is set
      try {
        await Promise.all([
          this.loadAbsenses(),
          this.loadOffdayRequests(),
          this.loadShiftsForRegister(),
          this.loadShiftsInTimeTable(),
          this.loadUserLink()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        loading.dismiss();
      }
    });
  }

  async loadShiftsInTimeTable(){
    try{
      this.shiftsOnTimeTable = await this.homePageService.getShifts(this.momentDateTime, this.companyId);
    }catch(error){
      await this.functions.presentToast(`Erro ao carregar turnos`, `danger`);
    }
  }

  async Next() {
    const loading = await this.showLoading();
    this.momentDateTime = new Date(this.momentDateTime.setDate(this.momentDateTime.getDate() + 1));
    await this.loadShiftsInTimeTable();
    loading.dismiss();
  }
  
  async Previous() {
    const loading = await this.showLoading();
    this.momentDateTime = new Date(this.momentDateTime.setDate(this.momentDateTime.getDate() - 1));
    await this.loadShiftsInTimeTable();
    loading.dismiss();
  }

  getDateLabel(): string {
    const current = new Date(this.momentDateTime);
    const today = new Date(this.today);
    const tomorrow = new Date(this.today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(this.today);
    yesterday.setDate(today.getDate() - 1);
  
    // Compare the dates (ignoring time)
    if (
      current.getDate() === today.getDate() &&
      current.getMonth() === today.getMonth() &&
      current.getFullYear() === today.getFullYear()
    ) {
      return 'Hoje'; // Today
    } else if (
      current.getDate() === tomorrow.getDate() &&
      current.getMonth() === tomorrow.getMonth() &&
      current.getFullYear() === tomorrow.getFullYear()
    ) {
      return 'Amanhã'; // Tomorrow
    } else if (
      current.getDate() === yesterday.getDate() &&
      current.getMonth() === yesterday.getMonth() &&
      current.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Ontem'; // Yesterday
    } else {
      // Fallback to formatted date if none match
      return current.toLocaleDateString('pt-PT');
    }
  }

  async loadUserLink(){
    try{
      this.userLink = await this.homePageService.getUserLink(this.companyId);
    }catch(error){
      await this.functions.presentToast(`Erro ao carregar cartão digital`, `danger`);
    }
  }

  async loadShiftsForRegister(){
    try{
      this.shiftsForRegister = await this.shiftService.getShiftsForRegister(this.companyId);
    }catch(error){
      await this.functions.presentToast(`Erro ao carregar turnos`, `danger`);
    }
  }

  async loadAbsenses() {
    try {
        this.absenseJus = await this.absenseService.getAbsenceJustifications(this.companyId);
        //console.log('Retrieved companies:', this.absenseJus);
      } catch (error) {
        await this.functions.presentToast(`Erro ao carregar justificações de faltas`, `danger`);
      }
  }

  async loadOffdayRequests(){
    try{
      this.offdayRes = await this.offdaysService.getOffdayRequests(this.companyId);
    }catch(error){
      await this.functions.presentToast(`Erro ao carregar pedidos de folgas e férias`, `danger`);
    }
  }

  async openDigitalCardModal(){
    const modal = await this.modalCtrl.create({
      component: DigitalCardComponent,
      componentProps: {
        link: this.userLink.link, 
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  async openCreateAbsJusModal(){
    const modal = await this.modalCtrl.create({
      component: CreateAbsenseJustificationModalComponent,
      componentProps: {
        companyId: this.companyId, 
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
      this.loadAbsenses();
    }
  }

  async openEditAbsJusModal(absjus: AbsenceJustification){
    const modal = await this.modalCtrl.create({
      component: EditAbsenseJustificationModalComponent,
      componentProps: {
        companyId: this.companyId, 
        absenseJustification: absjus
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
      this.loadAbsenses();
    }
  }

  async openCreateOffdayResModal(){
    const modal = await this.modalCtrl.create({
      component: CreateOffdayVacationRequestModalComponent,
      componentProps: {
        companyId: this.companyId,
      },
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === 'save'){
      this.loadOffdayRequests();
    }
  }

  async openEditOffdayResModal(offdayres: OffdayRequest){
    const modal = await this.modalCtrl.create({
      component: EditOffdayVacationRequestModalComponent,
      componentProps: {
        companyId: this.companyId,
        offdayRes: offdayres
      },
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === 'save'){
      this.loadOffdayRequests();
    }
  }



  async openWorkersOnShiftModal(shift: ShiftHappensInstance){
    //console.log("Chegou a acao");
    const modal = await this.modalCtrl.create({
      component: WorkersOnShiftModalComponent,
      componentProps: {
        shiftId: shift.id,
        starts: shift.starts,
        ends: shift.ends,
      },
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
  }


  async openWorkersReadertModal(id: string){
    const modal = await this.modalCtrl.create({
      component: ReaderModalComponent,
      componentProps: {
        id: id,
        link: this.userLink
      },
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
  }

  isShiftActive(shift: any): boolean {
    const now = new Date();
    const start = new Date(shift.starts);
    const end = new Date(shift.ends);
  
    return now >= start && now <= end;
  }
  


  getStatusText(status: string): string {
    switch (status) {
      case 'WaitingRevision':
        return 'Aguarda revisão';
      case 'Aproved':
        return 'Aprovada';
      case 'Recused':
        return 'Recusada';
      case 'CanceldByWorker':
        return 'Cancelada pelo trabalhador';
      default:
        return 'Status desconhecido';
    }
  }
  
  getStatusColor(status: string): string {
    switch (status) {
      case 'WaitingRevision':
        return 'yellow';
      case 'Aproved':
        return 'green';
      case 'Recused':
      case 'CanceldByWorker':
        return 'red';
      default:
        return 'gray';
    }
  }
  
}
