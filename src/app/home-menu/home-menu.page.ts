import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.page.html',
  styleUrls: ['./home-menu.page.scss'],
})
export class HomeMenuPage implements OnInit {

  photographyPosts = [];
  tags = ["all"];
  spaceEnoughForTags: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public popoverController: PopoverController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('../../assets/posts.json').subscribe(res => {
      this.photographyPosts = res['photographyPosts'];
      this.initTags();
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

    this.tags = ["all"];
    for (const post of picturePosts) {
      const tag = post.tag;
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }

  switchOn(type) {
    this.popoverController.dismiss({
      postType: type
    });
  }

  switchOnReducePosts(tag, type) {
    this.popoverController.dismiss({
      postType: type,
      tagType: tag
    });
  }

}
