import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-digital-card',
  templateUrl: './digital-card.component.html',
  styleUrls: ['./digital-card.component.scss'],
})
export class DigitalCardComponent  implements OnInit {

  link: string = "";

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.link = this.navParams.get('link');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
