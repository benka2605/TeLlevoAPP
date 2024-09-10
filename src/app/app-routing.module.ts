import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('./Pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./Pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'programar',
    loadChildren: () => import('./Pages/programar/programar.module').then( m => m.ProgramarPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./Pages/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./Pages/p404/p404.module').then( m => m.P404PageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
