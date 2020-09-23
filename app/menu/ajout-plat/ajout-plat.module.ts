import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutPlatPageRoutingModule } from './ajout-plat-routing.module';

import { AjoutPlatPage } from './ajout-plat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutPlatPageRoutingModule
  ],
  declarations: [AjoutPlatPage]
})
export class AjoutPlatPageModule { }
