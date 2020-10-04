import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

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
      paws: 0
    }
  };

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

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.category = params.type;
    });
  }

  async ngOnInit() {
    this.router.onSameUrlNavigation = 'reload';
    const snapshot = await this.firestore.collection(this.collectionName).ref
                              .orderBy('date', 'desc')
                              .get();
    snapshot.forEach(doc => {
      this.processSnapshopDoc(doc);
    });
    console.log("popp", this.articles.popular);
  }

  processSnapshopDoc(doc) {
    const data = doc.data();
    if (data['id'] == this.id && data['category'] === this.category) {
      this.article = data;
    } else {
      this.buildMostPopularArticles(data);
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

  share() {

  }

  objectValues(obj) {
    console.log("obj", Object.values(obj));
    return Object.values(obj);
}

}
