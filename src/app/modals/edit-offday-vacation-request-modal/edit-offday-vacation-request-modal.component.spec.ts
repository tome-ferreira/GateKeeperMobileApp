import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOffdayVacationRequestModalComponent } from './edit-offday-vacation-request-modal.component';

describe('EditOffdayVacationRequestModalComponent', () => {
  let component: EditOffdayVacationRequestModalComponent;
  let fixture: ComponentFixture<EditOffdayVacationRequestModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOffdayVacationRequestModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOffdayVacationRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
