import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  portraitPictures = [
    {
      tag: '#ec',
      image: '../../assets/icon/images/concert/FRO_1186.jpg',
      date: 'Jul 2019',
      title: 'Madison, ELECTRIC CASTLE ',
      description: 'mostRecentEvent'
    },
    {
      tag: '#ec',
      image: '../../assets/icon/images/concert/FRO_1338.jpg',
      date: 'Jul 2019',
      title: 'Madison, ELECTRIC CASTLE ',
      description: 'mostRecentEvent'
    },
    {
      tag: '#ec',
      image: '../../assets/icon/images/concert/FRO_0637.jpg',
      date: 'Jul 2019',
      title: 'Madison, ELECTRIC CASTLE ',
      description: 'mostRecentEvent'
    },
    {
      tag: '#awake',
      image: '../../assets/icon/images/concert/FRO_7401.jpg',
      date: 'Jul 2019',
      title: 'Madison, ELECTRIC CASTLE ',
      description: 'mostRecentEvent'
    },
    {
      tag: '#awake',
      image: '../../assets/icon/images/concert/FRO_8045.jpg',
      date: 'Jul 2019',
      title: 'Madison, ELECTRIC CASTLE ',
      description: 'mostRecentEvent'
    },
    {
      tag: '#ec',
      image: '../../assets/icon/images/concert/FRO_3780.jpg',
      date: 'Jul 2019',
      title: 'Madison, ELECTRIC CASTLE ',
      description: 'mostRecentEvent'
    }
  ];

  landscapePictures = [
    {
      tag: '#ec',
      image: '../../assets/icon/images/concert/FRO_1338.jpg',
      date: 'Jul 2019',
      title: 'Madison, ELECTRIC CASTLE ',
      description: 'mostRecentEvent'
    }
  ];

  columns = {left: [], middle: [], right: []};

  tags = ['ec', 'people', 'concert', 'sofitukker', 'recent'];
  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      '(max-width: 1874px)'
        ]).subscribe(result => {
          if (result.matches) {
            this.twoColumnsFormat();
          } else {
            this.threeColumnsFormat();
          }
        });
  }

  twoColumnsFormat() {
    const n = this.portraitPictures.length;
    this.columns.left = this.portraitPictures.slice(0, n / 2);
    this.columns.middle = this.portraitPictures.slice((n / 2), n + 1);
    this.columns.right = [];
  }

  threeColumnsFormat() {
    const n = this.portraitPictures.length;
    this.columns.left = this.portraitPictures.slice(0, n / 3);
    this.columns.middle = this.portraitPictures.slice((n / 3), (2 * n) / 3);
    this.columns.right = this.portraitPictures.slice(((2 * n) / 3), n + 1);
  }

}
