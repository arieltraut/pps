import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'animales',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../animales/animales.module').then(m => m.AnimalesPageModule)
          }
        ]
      },
      {
        path: 'colores',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../colores/colores.module').then(m => m.ColoresPageModule)
          }
        ]
      },
      {
        path: 'numeros',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../numeros/numeros.module').then(m => m.NumerosPageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '/tabs/animales',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
