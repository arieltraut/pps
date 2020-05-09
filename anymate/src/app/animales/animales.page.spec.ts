import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnimalesPage } from './animales.page';

describe('AnimalesPage', () => {
  let component: AnimalesPage;
  let fixture: ComponentFixture<AnimalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
