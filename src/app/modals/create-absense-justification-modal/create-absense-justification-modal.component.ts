import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AbsenceJustification } from 'src/app/models/absenseJustification.model';
import { AbsenceService } from 'src/app/services/absense.service';
import { FunctionsService } from 'src/app/services/functions.service';


@Component({
  selector: 'app-create-absense-justification-modal',
  templateUrl: './create-absense-justification-modal.component.html',
  styleUrls: ['./create-absense-justification-modal.component.scss'],
})
export class CreateAbsenseJustificationModalComponent  implements OnInit {

  form: FormGroup = this.formBuilder.group({});
  absenceJustification: any; 
  start : string = "";
  end : string = "";
  justification : string = "";
  status : string = "";
  companyId: string = '';

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private absenseService: AbsenceService,
    private functions: FunctionsService,
    private navParams: NavParams
  ) { this.setUpForm();}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  setUpForm() {
    this.form = this.formBuilder.group(
      {
        start: ['', [Validators.required]],
        end: ['', [Validators.required]],
        justification: ['', [Validators.required]],
      },
      { validators: this.dateValidation } 
    );
    this.companyId = this.navParams.get('companyId');
  }
  
  // Custom Validator for Date Validation
  dateValidation(group: FormGroup) {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
  
    const today = new Date(); // Get today's date
    today.setHours(0, 0, 0, 0); // Reset the time to 00:00:00 for comparison
  
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;
  
    // Check if start date is in the future
    if (startDate && startDate > today) {
      return { startFuture: true };
    }
  
    // Check if end date is in the future
    if (endDate && endDate > today) {
      return { endFuture: true };
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
      this.justification = formData.justification;
      this.status = "WaitingRevision";
      //console.log('dto', dto);
      await this.postAbsense(this.start, this.end, this.justification, this.status, this.companyId );
      
      loading.dismiss();

      this.modalCtrl.dismiss(formData, 'save');
    } else {
      this.form.markAllAsTouched(); 
    }
  }


  
  async postAbsense(start: string, end: string, justification: string, status: string, companyId: string ){
    try{
      await this.absenseService.postAbsenceJustifications(start, end, justification, status, companyId);
    }catch (error){
      await this.functions.presentToast(`Erro ao salvar justificação`, `danger`);
    }
  }

}
