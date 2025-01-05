import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AbsenceService } from 'src/app/services/absense.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { OffdaysService } from 'src/app/services/offdays.service';

@Component({
  selector: 'app-create-offday-vacation-request-modal',
  templateUrl: './create-offday-vacation-request-modal.component.html',
  styleUrls: ['./create-offday-vacation-request-modal.component.scss'],
})
export class CreateOffdayVacationRequestModalComponent  implements OnInit {

  form: FormGroup = this.formBuilder.group({});
  absenceJustification: any; 
  start : string = "";
  end : string = "";
  notes : string = "";
  status : string = "";
  companyId: string = '';

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private offdaysService: OffdaysService,
    private functions: FunctionsService,
    private navParams: NavParams
  ) {this.setUpForm();}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  setUpForm() {
    this.form = this.formBuilder.group(
      {
        start: ['', [Validators.required]],
        end: ['', [Validators.required]],
        notes: ['', []],
      },
      { validators: this.futureDateValidation } // Apply custom future date validation
    );
    this.companyId = this.navParams.get('companyId');
  }
  
  // Custom Validator for Future Date Validation
  futureDateValidation(group: FormGroup) {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
  
    const today = new Date(); // Get today's date
    today.setHours(0, 0, 0, 0); // Reset the time to 00:00:00 for comparison
  
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;
  
    // Check if start date is in the past or today
    if (startDate && startDate <= today) {
      return { startNotFuture: true };
    }
  
    // Check if end date is in the past or today
    if (endDate && endDate <= today) {
      return { endNotFuture: true };
    }
  
    // Check if start date is after end date
    if (startDate && endDate && startDate > endDate) {
      return { startAfterEnd: true };
    }
  
    return null;
  }

    async saveForm() {
      if (this.form.valid) {
        const formData = this.form.value;
        //console.log('formData', formData);
        const loading = await this.functions.showLoading();
        
        this.start = formData.start;
        this.end = formData.end;
        this.notes = formData.notes;
        this.status = "WaitingRevision";

        await this.postOffdayRes(this.start, this.end, this.notes, this.status, this.companyId );
        
        loading.dismiss();
  
        this.modalCtrl.dismiss(formData, 'save');
      } else {
        this.form.markAllAsTouched(); 
      }
    }


    async postOffdayRes(start: string, end: string, notes: string, status: string, companyId: string ){
      try{
        await this.offdaysService.postOffdayRequests(start, end, notes, status, companyId);
      }catch (error){
        await this.functions.presentToast(`Erro ao salvar pedido`, `danger`);
      }
    }

}
