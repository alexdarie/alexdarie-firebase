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

  spaceEnoughForTags: boolean;
  photographyPosts = [];
  techPosts = [];
  story = {
    photography: {
      title: '',
      description: ''
    },
    tech: {
      title: '',
      description: ''
    }
  };

  tags = [];
  noColumns: number;
  columns = {left: [], middle: [], right: []};
  techColumns = {left: [], middle: [], right: []};
  currentSegment = 'preview';
  slideOpts = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private modalController: ModalController,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('../../assets/posts.json').subscribe(res => {
      this.photographyPosts = res['photographyPosts'];
      this.techPosts = res['techPosts'];
      this.slideOpts = res['slideOpts'];
      this.story = res['story'];
      console.log(this.story);
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
      this.breakpointObserver.observe(['(max-width: 1200px)']).subscribe(result => {
        if (result.matches) {
          this.spaceEnoughForTags = false;
        } else {
          this.spaceEnoughForTags = true;
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

    for (const post of this.photographyPosts) {
      const tag = post.tag;
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }
  }

  twoColumnsFormat(picturePosts = this.photographyPosts) {
    /* Switching betweem three and two columns grid display. */

    let n = picturePosts.length;
    this.columns.left = picturePosts.slice(0, n / 2);
    this.columns.middle = picturePosts.slice((n / 2), n + 1);
    this.columns.right = [];

    n = this.techPosts.length;
    this.techColumns.left = this.techPosts.slice(0, n / 2);
    this.techColumns.middle = this.techPosts.slice((n / 2), n + 1);
    this.techColumns.right = [];
  }

  threeColumnsFormat(picturePosts = this.photographyPosts) {
    /* Switching betweem two and three columns grid display. */

    let n = picturePosts.length;
    this.columns.left = picturePosts.slice(0, n / 3);
    this.columns.middle = picturePosts.slice((n / 3), (2 * n) / 3);
    this.columns.right = picturePosts.slice(((2 * n) / 3), n + 1);

    n = this.techPosts.length;
    this.techColumns.left = this.techPosts.slice(0, n / 3);
    this.techColumns.middle = this.techPosts.slice((n / 3), (2 * n) / 3);
    this.techColumns.right = this.techPosts.slice(((2 * n) / 3), n + 1);
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

    if (tag === 'all') {
      this.allPosts();
    } else {
      const visiblePicturePosts = [];
      for (const post of this.photographyPosts) {
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
  }

  allPosts() {
    /* Selecting the '#all' tag, the user reverts the content to its initial state of '
    all pictures included in the grid'. */

    for (const post of this.photographyPosts) {
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
