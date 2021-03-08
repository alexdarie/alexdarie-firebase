import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { IpServiceService } from '../ip-service.service';
import * as firebase from 'firebase/app';

interface Reactions {
  beers: [],
  paws: []
};

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit, OnDestroy {

  article = {
    id: 0,
    title: '',
    author: '',
    date: '',
    peopleInvolved: [],
    photosAuthor: '',
    readTime: 0,
    poster: '',
    image: '',
    category: '',
    content: {
      rules: {},
      header: '',
      paragraphs: []
    },
    media: {
      picture: [],
      video: []
    },
    reactions: {
      beer: 0,
      paws: 0,
      rid: ''
    }
  };
  articleHash;
  disableReactions: boolean;

  // A default structure for the content that will be later loaded.
  articles = {
    popular: [],
    tipsAndTricks: [],
    concerts: [],
    cs: []
  };

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
  };

  collectionName = 'articles';
  id: string;
  category: string;
  ipAddress;
  gavePaws = false;
  gaveBeer = false;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router,
    private firestore: AngularFirestore,
    private ip: IpServiceService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.category = params.type;
    });
    this.disableReactions = false;
  }

  async ngOnInit() {
    this.router.onSameUrlNavigation = 'reload';
    const snapshot = await this.firestore.collection(this.collectionName).ref
                              .orderBy('date', 'desc')
                              .get();
    snapshot.forEach(doc => {
      this.processSnapshopDoc(doc);
    });

    await this.getIP();
    var reactRef = this.firestore.collection("reactions").doc(this.article.reactions.rid);
    const r = await reactRef.ref.get();
    const reactions = r.data();

    if (!reactions.hasOwnProperty('views') || !reactions.views.includes(this.ipAddress)) {
      reactRef.update({
        views: firebase.firestore.FieldValue.arrayUnion(this.ipAddress)
      });
    }

    if (reactions.beers.includes(this.ipAddress)) {
      this.gaveBeer = true;
    }

    if (reactions.paws.includes(this.ipAddress)) {
      this.gavePaws = true;
    }
  }

  async getIP() {  
    return new Promise((resolve, reject) => {
      this.ip.getIPAddress().subscribe((res:any)=>{  
        this.ipAddress = res.ip;  
        console.log(this.ipAddress);
        resolve(true);
      });  
    });
  } 

  async processSnapshopDoc(doc) {
    const data = doc.data();
    if (data['id'] == this.id && data['category'] === this.category) {
      this.article = data;
      this.articleHash = doc.id;
      var reactRef = this.firestore.collection("reactions").doc(this.article.reactions.rid);
      const r = await reactRef.ref.get();
      const reactions = r.data();
      this.article.reactions.beer = reactions.beers.length;
      this.article.reactions.paws = reactions.paws.length;
    } else {
      this.buildMostPopularArticles(data);
    }
  }

  updateArticle(doc) {
    const data = doc.data();
    if (data['id'] == this.id && data['category'] === this.category) {
      this.article = data;
      this.articleHash = doc.id;
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

  ngOnDestroy() {
    this.router.onSameUrlNavigation = 'ignore';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async react(type) {
    this.disableReactions = true;

    if (this.articleHash.length < 1) {
      await this.getIP();
    }
    var reactRef = this.firestore.collection("reactions").doc(this.article.reactions.rid);
    const r = await reactRef.ref.get();
    const reactions = r.data();
    const docRef = this.firestore.collection("articles").doc(this.articleHash);

    if (type === 'paws') {
      if (reactions.paws.includes(this.ipAddress)) {
        reactRef.update({
          paws: firebase.firestore.FieldValue.arrayRemove(this.ipAddress)
        }).then(() => {
          this.article.reactions.paws -= 1;
          this.gavePaws = false;
          this.disableReactions = false;
        });;
      } else {
        reactRef.update({
          paws: firebase.firestore.FieldValue.arrayUnion(this.ipAddress)
        }).then(() => {
          this.article.reactions.paws += 1;
          this.gavePaws = true;
          this.disableReactions = false;
        });;
      }
    }

    if (type === 'beer') {
      if (reactions.beers.includes(this.ipAddress)) {
        reactRef.update({
          beers: firebase.firestore.FieldValue.arrayRemove(this.ipAddress)
        }).then(() => {
          this.article.reactions.beer -= 1;
          this.gaveBeer = false;
          this.disableReactions = false;
        });
      } else {
        reactRef.update({
          beers: firebase.firestore.FieldValue.arrayUnion(this.ipAddress)
        }).then(() => {
          this.article.reactions.beer += 1;
          this.gaveBeer = true;
          this.disableReactions = false;
        });
      }
    }
  }

  objectValues(obj) {
    // console.log("obj", Object.values(obj));
    return Object.values(obj);
}

}
