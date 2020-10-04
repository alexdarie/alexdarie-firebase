import { Component, ViewChild, OnInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IonSlides, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlbumPage } from '../album/album.page';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slider')  slides: IonSlides;

  // Slide options are set by default on medium format view. It
  // addapts to screen size.
  crntSldOpt: number;
  slideOptions = {
    1: {
      initialSlide: 0,
      speed: 600,
      loop: true,
      // autoplay: true
    },
    2: {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 4.5
    },
    3: {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 2.5
    },
    4: {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 2.2
    }
  };

  // A default structure for the content that will be later loaded.
  articles = {
    popular: [],
    tipsAndTricks: [],
    concerts: [],
    cs: []
  };
  projectsDescription: string;
  collectionName = 'articles';

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private breakpointObserver: BreakpointObserver,
    private platform: Platform,
    private firestore: AngularFirestore
  ) {
  }

  async ngOnInit() {
    this.crntSldOpt = 2;
    let snapshot = await this.firestore.collection(this.collectionName).ref
                            .orderBy('date', 'desc')
                            .get();
    snapshot.forEach(doc => {
      this.processSnapshopDoc(doc);
    });

    snapshot = await this.firestore.collection('metadata').ref
                            .get();
    snapshot.forEach(doc => {
      this.processMetadata(doc);
    });

    this.setViewBreakpoints();
    this.setPlatformReadyRoutine();
  }

  setViewBreakpoints() {
    this.breakpointObserver.observe(['(max-width: 1020px)']).subscribe(result => {
      if (result.matches) {
        this.crntSldOpt = 3;
      } else {
        this.crntSldOpt = 2;
      }
    });

    this.breakpointObserver.observe(['(max-width: 540px)']).subscribe(result => {
      if (result.matches) {
        this.crntSldOpt = 4;
      } else {
        this.crntSldOpt = 3;
      }
    });
  }

  setPlatformReadyRoutine() {
    this.platform.ready().then((readySource) => {
      const width = this.platform.width();
      if (width > 1020) {
        this.crntSldOpt = 2;
      } else if (width > 520) {
        this.crntSldOpt = 3;
      } else {
        this.crntSldOpt = 4;
      }
    });
  }

  processSnapshopDoc(doc) {
    const data = doc.data();
    if (data['category'] === 'cs') {
      this.articles.cs.push(data);
    }
    else if (data['category'] === 'concert') {
      this.articles.concerts.push(data);
    }
    else if (data['category'] === 'tips-and-tricks') {
      this.addToTipsAndTricks(data, 3);
    }
    this.buildMostPopularArticles(data);
  }

  processMetadata(doc) {
    const key = doc.id;
    if (key === 'project') {
      this.projectsDescription = doc.data()['description'];
    }
  }

  addToTipsAndTricks(data, maxPerRow) {
    const tt = this.articles.tipsAndTricks;
    const n = tt.length - 1;
    if (tt.length === 0 || tt[n].length === maxPerRow) {
      tt.push([data]);
    } else {
      tt[n].push(data);
    }
  }

  buildMostPopularArticles(data) {
    const pop = this.articles.popular;
    const n = pop.length;
    let position = 0;
    for (let i = 0; i < n - 1; i++) {
      if (data['views'] < pop[i]['views']) {
        position += 1;
      }
    }
    for (let i = n; i > position; i--) {
      pop[i] = pop[i - 1];
    }
    pop[position] = data;
  }

  async presentAlbum(event) {
    /* Opens the modal with more content regarding the post. */

    const modal = await this.modalController.create({
      component: AlbumPage,
      componentProps: {
        evnt: event
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

}
