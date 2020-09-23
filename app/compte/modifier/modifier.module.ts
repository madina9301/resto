import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierPageRoutingModule } from './modifier-routing.module';

import { ModifierPage } from './modifier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModifierPageRoutingModule
  ],
  declarations: [ModifierPage]
})
export class ModifierPageModule { }
