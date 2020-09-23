import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accueil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../accueil/accueil.module').then(m => m.AccueilPageModule)
          }
        ]
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../menu/menu.module').then(m => m.MenuPageModule)
          },
          {
            path: 'ajout-plat',
            loadChildren: () => import('../menu/ajout-plat/ajout-plat.module').then(m => m.AjoutPlatPageModule)
          },
          {
            path: 'modifier-plat/:id',
            loadChildren: () => import('../menu/modifier-plat/modifier-plat.module').then(m => m.ModifierPlatPageModule)
          },

        ]
      },
      {
        path: 'commandes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../commandes/commandes.module').then(m => m.CommandesPageModule)
          },
        ]
      },
      {
        path: 'compte',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../compte/compte.module').then(m => m.ComptePageModule)
          },
          {
            path: 'modifier/:id',
            loadChildren: () => import('../compte/modifier/modifier.module').then(m => m.ModifierPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/acceuil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
