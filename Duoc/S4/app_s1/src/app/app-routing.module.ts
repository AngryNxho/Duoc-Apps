import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    data: { direction: 'forward' } // Dirección de navegación cuando se va a login
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    data: { direction: 'forward' } // Dirección cuando se va a home
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then(m => m.AyudaPageModule),
    data: { direction: 'back' } // Ajusta la dirección según prefieras
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosPageModule),
    data: { direction: 'forward' }
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    data: { direction: 'back' } // Ajusta según prefieras
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: '**', // Ruta comodín para redireccionar al Page 404
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
