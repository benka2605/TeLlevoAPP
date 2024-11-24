import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


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
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./Pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'programar',
    loadChildren: () => import('./Pages/programar/programar.module').then( m => m.ProgramarPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'viaje',
    loadChildren: () => import('./Pages/viaje/viaje.module').then( m => m.ViajePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./Pages/notificacion/notificacion.module').then( m => m.NotificacionPageModule)
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
