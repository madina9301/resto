import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AccueilPage } from './accueil.page';

const routes: Routes = [
    {
        path: '',
        component: AccueilPage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccueilPageRoutingModule { }
