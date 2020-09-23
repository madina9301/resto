import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierPlatPage } from './modifier-plat.page';
import { AuthService } from 'src/app/services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: ModifierPlatPage,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierPlatPageRoutingModule { }
