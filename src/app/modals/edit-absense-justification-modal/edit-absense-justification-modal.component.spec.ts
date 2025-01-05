import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAbsenseJustificationModalComponent } from './edit-absense-justification-modal.component';

describe('EditAbsenseJustificationModalComponent', () => {
  let component: EditAbsenseJustificationModalComponent;
  let fixture: ComponentFixture<EditAbsenseJustificationModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAbsenseJustificationModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAbsenseJustificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
