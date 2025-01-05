import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateAbsenseJustificationModalComponent } from './create-absense-justification-modal.component';

describe('CreateAbsenseJustificationModalComponent', () => {
  let component: CreateAbsenseJustificationModalComponent;
  let fixture: ComponentFixture<CreateAbsenseJustificationModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAbsenseJustificationModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAbsenseJustificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
