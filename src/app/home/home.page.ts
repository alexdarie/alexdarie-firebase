import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ModalController } from '@ionic/angular';
import { EventModalPage } from '../event-modal/event-modal.page';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  portraitPictures = [];

  tags = [];
  noColumns: number;
  columns = {left: [], middle: [], right: []};
  currentSegment = 'preview';
  slideOpts = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private modalController: ModalController,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('../../assets/posts.json').subscribe(res => {
      this.portraitPictures = res['portraitPictures'];
      this.slideOpts = res['slideOpts'];
      this.initTags();
      this.breakpointObserver.observe(['(max-width: 1874px)']).subscribe(result => {
            if (result.matches) {
              this.twoColumnsFormat();
              this.noColumns = 2;
            } else {
              this.threeColumnsFormat();
              this.noColumns = 3;
            }
          });
    },
    (err) => {
      alert('failed loading json data');
    });
    this.initTags();
  }

  initTags() {
    /* Initialize tags list content. */

    for (const post of this.portraitPictures) {
      const tag = post.tag;
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }
  }

  twoColumnsFormat(picturePosts = this.portraitPictures) {
    /* Switching betweem three and two columns grid display. */

    const n = picturePosts.length;
    this.columns.left = picturePosts.slice(0, n / 2);
    this.columns.middle = picturePosts.slice((n / 2), n + 1);
    this.columns.right = [];
  }

  threeColumnsFormat(picturePosts = this.portraitPictures) {
    /* Switching betweem two and three columns grid display. */

    const n = picturePosts.length;
    this.columns.left = picturePosts.slice(0, n / 3);
    this.columns.middle = picturePosts.slice((n / 3), (2 * n) / 3);
    this.columns.right = picturePosts.slice(((2 * n) / 3), n + 1);
  }

  async presentAlbum(event) {
    /* Opens the modal with more content regarding the post. */

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

  reducePosts(tag) {
    /* Selecting a tag, the user reduces the number of posts, while the list of pictures
    is updating the boolean value of its elements' 'hide' attribute. */

    const visiblePicturePosts = [];
    for (const post of this.portraitPictures) {
      const postTag = post.tag;
      if (postTag !== tag) {
        post.hide = true;
      } else {
        visiblePicturePosts.push(post);
      }
    }
    if (this.noColumns === 2) {
      this.twoColumnsFormat(visiblePicturePosts);
    } else {
      this.threeColumnsFormat(visiblePicturePosts);
    }
  }

  allPosts() {
    /* Selecting the '#all' tag, the user reverts the content to its initial state of '
    all pictures included in the grid'. */

    for (const post of this.portraitPictures) {
      if (post.hide === true) {
        post.hide = false;
      }
    }
    if (this.noColumns === 2) {
      this.twoColumnsFormat();
    } else {
      this.threeColumnsFormat();
    }
  }

}
