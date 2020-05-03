import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GalleryPage } from './gallery.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryPage]
})
export class GalleryPageModule {}



// const routes: Routes = [
//   {
//     path: '',
//     component: GalleryPage,
//     children: [
//       {
//         path: 'list',
//         children: [
//           {
//             path: '',
//               loadChildren: './list/list.module#ListPageModule'
//           },
//           {
//             path: 'details:postId',
//               loadChildren: './list/details/details.module#DetailsPageModule'
//           }
//         ]
//       }
//     ]
//   }
// ];
