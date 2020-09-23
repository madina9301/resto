import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutPlatPage } from './ajout-plat.page';
import { AuthService } from 'src/app/services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: AjoutPlatPage,
    canActivate: [AuthService]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutPlatPageRoutingModule { }
