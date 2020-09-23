import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjoutPlatPage } from './ajout-plat.page';

describe('AjoutPlatPage', () => {
  let component: AjoutPlatPage;
  let fixture: ComponentFixture<AjoutPlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPlatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutPlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
