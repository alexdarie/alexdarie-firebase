import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage implements OnInit {

  img: any;
  event: any;
  currentSegment = 'pictures';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams) {

  }

  ngOnInit() {
    this.img = this.navParams.get('img');
    this.event = this.navParams.get('evnt');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  segmentChanged(event) {
    this.currentSegment = event.detail.value;
  }

}
