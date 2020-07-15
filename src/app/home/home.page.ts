import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ModalController } from '@ionic/angular';
import { EventModalPage } from '../event-modal/event-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  portraitPictures = [
    {
      tag: 'ec',
      tagColor: 'secondary',
      image: '../../assets/icon/images/concert/FRO_1186.jpg',
      viewStatus: 'preview',
      previewImages: [
        '../../assets/icon/images/concert/FRO_0917.jpg',
        '../../assets/icon/images/concert/FRO_1091.jpg',
        '../../assets/icon/images/concert/FRO_1186.jpg'
      ],
      postImages: [
        '../../assets/icon/images/concert/FRO_0917.jpg',
        '../../assets/icon/images/concert/FRO_0976.jpg',
        '../../assets/icon/images/concert/FRO_1052.jpg',
        '../../assets/icon/images/concert/FRO_1091.jpg',
        '../../assets/icon/images/concert/FRO_1225.jpg',
        '../../assets/icon/images/concert/FRO_1121.jpg',
        '../../assets/icon/images/concert/FRO_1186.jpg'
        ],
      date: 'May 2019',
      title: 'Courtyard',
      description: 'Arguably, every time there something new when you go to a large festival, yet the interaction with those organizing it remains ' +
      'pretty much unchanged. If there is one thing I will remember from the 7th edition of Electric Castle is that you should always let the backstage ' +
      'crew know that you are walking around. Even though you have the right to be everywhere, you should still tell them know your intentions. Besides, they might even ' +
      'be kind enough to guide you and let you know when something important will happen.'
    },
    {
      tag: 'people',
      tagColor: 'secondary',
      image: '../../assets/icon/images/concert/FRO_1363.jpg',
      viewStatus: 'preview',
      previewImages: [
        '../../assets/icon/images/concert/FRO_1363.jpg',
        '../../assets/icon/images/concert/FRO_1588.jpg',
      ],
      postImages: [
        '../../assets/icon/images/concert/FRO_1363.jpg',
        '../../assets/icon/images/concert/FRO_1588.jpg',
        '../../assets/icon/images/concert/FRO_1497.jpg'
      ],
      date: 'Jul 2019',
      title: 'Hidden Alley',
      description: ''
    },
    {
      tag: 'people',
      tagColor: 'primary',
      image: '../../assets/icon/images/concert/FRO_3780.jpg',
      viewStatus: 'preview',
      previewImages: [
        '../../assets/icon/images/concert/FRO_3780.jpg',
        '../../assets/icon/images/concert/FRO_1338.jpg'
      ],
      postImages: [
        '../../assets/icon/images/concert/FRO_3780.jpg',
        '../../assets/icon/images/concert/FRO_1338.jpg'
      ],
      date: 'May 2019',
      title: 'Festival people',
      description: ''
    },
    {
      tag: 'people',
      tagColor: 'secondary',
      image: '../../assets/icon/images/concert/FRO_0637.jpg',
      viewStatus: 'preview',
      previewImages: [
        '../../assets/icon/images/concert/FRO_9540.jpg',
        '../../assets/icon/images/concert/FRO_9621.jpg',
      ],
      postImages: [
        '../../assets/icon/images/concert/FRO_9540.jpg',
        '../../assets/icon/images/concert/FRO_9621.jpg',
        '../../assets/icon/images/concert/FRO_9493.jpg',
        '../../assets/icon/images/concert/FRO_9711.jpg',
        '../../assets/icon/images/concert/FRO_9506.jpg',
        '../../assets/icon/images/concert/FRO_9491.jpg'
      ],
      date: 'Jul 2019',
      title: 'Refract Light',
      description: 'More here..'
    },
    {
      tag: 'summerwell',
      tagColor: 'primary',
      image: '../../assets/icon/images/concert/FRO_6676.jpg',
      viewStatus: 'static',
      previewImages: ['../../assets/icon/images/concert/FRO_6676.jpg'],
      postImages: ['../../assets/icon/images/concert/FRO_6676.jpg'],
      date: 'Oct 2018',
      title: 'Sofi Tukker',
      description: 'More here..'
    },
    {
      tag: 'awake',
      tagColor: 'primary',
      image: '../../assets/icon/images/concert/FRO_7401.jpg',
      viewStatus: 'static',
      previewImages: [
        '../../assets/icon/images/concert/FRO_7401.jpg',
        '../../assets/icon/images/concert/FRO_8045.jpg'
      ],
      postImages: [
        '../../assets/icon/images/concert/FRO_7401.jpg',
        '../../assets/icon/images/concert/FRO_8045.jpg'
      ],
      date: 'Oct 2019',
      title: 'Awake',
      description: ''
    },
    {
      tag: 'travel',
      tagColor: 'primary',
      image: '../../assets/icon/images/travel/FRO_1716.jpg',
      viewStatus: 'preview',
      previewImages: [
        '../../assets/icon/images/travel/FRO_9694.jpg',
        '../../assets/icon/images/travel/FRO_0514.jpg',
        '../../assets/icon/images/travel/FRO_1737.jpg'
      ],
      postImages: [
        '../../assets/icon/images/travel/FRO_1722.jpg',
        '../../assets/icon/images/travel/FRO_1737.jpg',
        '../../assets/icon/images/travel/FRO_0514.jpg',
        '../../assets/icon/images/travel/FRO_1716.jpg',
        '../../assets/icon/images/travel/FRO_9694.jpg'
      ],
      date: 'Mar 2019',
      title: 'Travelling',
      description: ''
    }
  ];

  tags = [];
  noColumns: number;
  columns = {left: [], middle: [], right: []};
  currentSegment = 'preview';
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true,
    pager: true
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private modalController: ModalController) {
    breakpointObserver.observe([
      '(max-width: 1874px)'
        ]).subscribe(result => {
          if (result.matches) {
            this.twoColumnsFormat();
            this.noColumns = 2;
          } else {
            this.threeColumnsFormat();
            this.noColumns = 3;
          }
        });
    for (let key in this.portraitPictures) {
      const tag = this.portraitPictures[key]['tag'];
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }
  }

  twoColumnsFormat(picturePosts = this.portraitPictures) {
    const n = picturePosts.length;
    this.columns.left = picturePosts.slice(0, n / 2);
    this.columns.middle = picturePosts.slice((n / 2), n + 1);
    this.columns.right = [];
  }

  threeColumnsFormat(picturePosts = this.portraitPictures) {
    const n = picturePosts.length;
    this.columns.left = picturePosts.slice(0, n / 3);
    this.columns.middle = picturePosts.slice((n / 3), (2 * n) / 3);
    this.columns.right = picturePosts.slice(((2 * n) / 3), n + 1);
  }

  async presentAlbum(event) {
    const modal = await this.modalController.create({
      component: EventModalPage,
      componentProps: {
        evnt: event
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  async openPreview(image) {
    const modal = await this.modalController.create({
      component: EventModalPage,
      componentProps: {
        img: image
      }
    });
    await modal.present();
  }

  reducePosts(tag) {
    console.log(tag);
    const visiblePicturePosts = [];
    for (const key in this.portraitPictures) {
      const postTag = this.portraitPictures[key]['tag'];
      if (postTag !== tag) {
        this.portraitPictures[key]['viewStatus'] = 'hide';
      } else {
        visiblePicturePosts.push(this.portraitPictures[key]);
      }
    }
    if (this.noColumns === 2) {
      this.twoColumnsFormat(visiblePicturePosts);
    } else {
      this.threeColumnsFormat(visiblePicturePosts);
    }
  }

  allPosts() {
    for (const key in this.portraitPictures) {
      const post = this.portraitPictures[key];
      if (post['viewStatus'] === 'hide') {
        post['viewStatus'] = 'preview';
      }
    }
    if (this.noColumns === 2) {
      this.twoColumnsFormat();
    } else {
      this.threeColumnsFormat();
    }
  }

}
