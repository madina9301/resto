import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ComptePage } from './compte.page';

const routes: Routes = [
    {
        path: '',
        component: ComptePage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModifierPlatPageRoutingModule { }
