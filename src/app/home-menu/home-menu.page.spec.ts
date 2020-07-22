import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeMenuPage } from './home-menu.page';

describe('HomeMenuPage', () => {
  let component: HomeMenuPage;
  let fixture: ComponentFixture<HomeMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
