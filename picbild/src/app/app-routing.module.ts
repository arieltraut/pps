import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryPageModule' },
  { path: 'list/:type', loadChildren: './gallery/list/list.module#ListPageModule' },
  { path: 'details/:postId', loadChildren: './gallery/list/details/details.module#DetailsPageModule' },
  { path: 'new-post/:type', loadChildren: './gallery/list/new-post/new-post.module#NewPostPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
