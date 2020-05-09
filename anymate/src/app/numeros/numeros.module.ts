import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumerosPageRoutingModule } from './numeros-routing.module';

import { NumerosPage } from './numeros.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumerosPageRoutingModule,
    TranslateModule
  ],
  declarations: [NumerosPage]
})
export class NumerosPageModule {}
