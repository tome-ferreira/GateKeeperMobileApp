import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateOffdayVacationRequestModalComponent } from './create-offday-vacation-request-modal.component';

describe('CreateOffdayVacationRequestModalComponent', () => {
  let component: CreateOffdayVacationRequestModalComponent;
  let fixture: ComponentFixture<CreateOffdayVacationRequestModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOffdayVacationRequestModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOffdayVacationRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
