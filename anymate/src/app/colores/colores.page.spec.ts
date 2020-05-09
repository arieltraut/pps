import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColoresPage } from './colores.page';

describe('ColoresPage', () => {
  let component: ColoresPage;
  let fixture: ComponentFixture<ColoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
