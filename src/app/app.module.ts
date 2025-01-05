import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAbsenseJustificationModalComponent } from './modals/create-absense-justification-modal/create-absense-justification-modal.component';
import { EditAbsenseJustificationModalComponent } from './modals/edit-absense-justification-modal/edit-absense-justification-modal.component';
import { CreateOffdayVacationRequestModalComponent } from './modals/create-offday-vacation-request-modal/create-offday-vacation-request-modal.component';
import { EditOffdayVacationRequestModalComponent } from './modals/edit-offday-vacation-request-modal/edit-offday-vacation-request-modal.component';
import { WorkersOnShiftModalComponent } from './modals/workers-on-shift-modal/workers-on-shift-modal.component';
import { ReaderModalComponent } from './modals/reader-modal/reader-modal.component';
import { ResultModalComponent } from './modals/result-modal/result-modal.component';
import { DigitalCardComponent } from './modals/digital-card/digital-card.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent, 
    CreateAbsenseJustificationModalComponent, 
    EditAbsenseJustificationModalComponent, 
    CreateOffdayVacationRequestModalComponent, 
    EditOffdayVacationRequestModalComponent,
    WorkersOnShiftModalComponent,
    ReaderModalComponent,
    ResultModalComponent,
    DigitalCardComponent
   ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'ios',
    }), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
