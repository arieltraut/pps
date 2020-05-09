import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumerosPage } from './numeros.page';

describe('NumerosPage', () => {
  let component: NumerosPage;
  let fixture: ComponentFixture<NumerosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumerosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
