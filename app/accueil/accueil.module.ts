import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccueilPage } from './accueil.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MenuPageModule } from '../menu/menu.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: AccueilPage }])
  ],
  declarations: [AccueilPage]
})
export class AccueilPageModule { }
