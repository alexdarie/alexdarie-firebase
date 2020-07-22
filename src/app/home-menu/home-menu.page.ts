import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.page.html',
  styleUrls: ['./home-menu.page.scss'],
})
export class HomeMenuPage implements OnInit {

  constructor(
    public popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }

  switchOnTech() {
    this.popoverController.dismiss({
      postType: 'tech'
    });
  }

  switchOnPhotography() {
    this.popoverController.dismiss({
      postType: 'photography'
    });
  }

  switchOnAbout() {
    this.popoverController.dismiss({
      postType: 'about'
    });
  }

}
