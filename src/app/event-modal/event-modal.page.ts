import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage implements OnInit, AfterViewInit {

  @ViewChild('slider')  slides: IonSlides;

  img: any;
  event: any;
  currentSegment = 'pictures';
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private platform: Platform) {
      this.platform.backButton.subscribeWithPriority(-1, () => {
        this.modalController.dismiss({
          dismissed: true
        });
      });
  }

  ngOnInit() {
    this.img = this.navParams.get('img');
    this.event = this.navParams.get('evnt');
  }

  ngAfterViewInit() {
      setTimeout(
        ()=>{
          if(this.slides){
            this.slides.update();
          }
        },300
      );
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

  swipeNext(){
    this.slides.slideNext();
  }

  swipePrev(){
    this.slides.slidePrev();
  }

}
