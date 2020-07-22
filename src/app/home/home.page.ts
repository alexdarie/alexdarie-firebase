import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ModalController } from '@ionic/angular';
import { EventModalPage } from '../event-modal/event-modal.page';
import { HttpClient } from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import { HomeMenuPage } from '../home-menu/home-menu.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  spaceEnoughForTags: boolean;
  photographyPosts = [];
  techPosts = [];
  aboutMePosts = [];
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
  postsType = 'photography';
  noColumns: number;
  columns = {left: [], middle: [], right: []};
  techColumns = {left: [], middle: [], right: []};
  currentSegment = 'preview';
  slideOpts = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private modalController: ModalController,
    private http: HttpClient,
    public popoverController: PopoverController) {
  }

  ngOnInit() {
    this.http.get('../../assets/posts.json').subscribe(res => {
      this.photographyPosts = res['photographyPosts'];
      this.techPosts = res['techPosts'];
      this.aboutMePosts = res['aboutMePosts'];
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
      this.breakpointObserver.observe(['(max-width: 750px)']).subscribe(result => {
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
  }

  initTags(picturePosts = this.photographyPosts) {
    /* Initialize tags list content. */

    this.tags = [];
    for (const post of picturePosts) {
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

    const posts = {tech: this.techPosts, photography: this.photographyPosts};
    if (tag === 'all') {
      this.allPosts();
    } else {
      const visiblePicturePosts = [];
      for (const post of posts[this.postsType]) {
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

    const posts = {tech: this.techPosts, photography: this.photographyPosts};
    for (const post of posts[this.postsType]) {
      if (post.hide === true) {
        post.hide = false;
      }
    }
    if (this.noColumns === 2) {
      if (this.postsType === 'tech') {
        this.twoColumnsFormat(this.techPosts);
      } else if (this.postsType === 'about') {
        this.threeColumnsFormat(this.aboutMePosts);
      } else {
        this.twoColumnsFormat();
      }
    } else {
      if (this.postsType === 'tech') {
        this.threeColumnsFormat(this.techPosts);
      } else if (this.postsType === 'about') {
        this.threeColumnsFormat(this.aboutMePosts);
      } else {
        this.threeColumnsFormat();
      }
    }
  }

  async presentMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: HomeMenuPage,
      event: ev,
      translucent: true
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    this.postsType = data.postType;
    if (this.noColumns === 2) {
      if (this.postsType === 'tech') {
        this.twoColumnsFormat(this.techPosts);
        this.initTags(this.techPosts);
      } else if (this.postsType === 'about') {
        this.twoColumnsFormat(this.aboutMePosts);
        this.initTags(this.aboutMePosts);
      } else {
        this.twoColumnsFormat();
        this.initTags();
      }
    } else {
      if (this.postsType === 'tech') {
        this.threeColumnsFormat(this.techPosts);
        this.initTags(this.techPosts);
      } else if (this.postsType === 'about') {
        this.threeColumnsFormat(this.aboutMePosts);
        this.initTags(this.aboutMePosts);
      } else {
        this.threeColumnsFormat();
      }
    }
  }

}
