import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { EtudiantComponent } from './theme/layout/Etudiant/etudiant.component';
import { FormateurComponent } from './theme/layout/Formateur/formateur.component';
import { authGuard } from './authorization/auth.guard';
import { roleGuard } from './authorization/role.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    children: []
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  },
  {
    path: 'Admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./Components/Statistique/statistique-admin/statistique-admin.component').then((c) => c.StatistiqueAdminComponent)
      },
      {
        path: 'Formations',
        loadChildren: () => import('./Components/formation/formation.module').then(m => m.FormationModule)
      },
      {
        path: 'Fourmateurs',
        loadChildren: () => import('./Components/fourmateur/fourmateur.module').then(m => m.FourmateurModule)
      },
      {
        path: '',
        loadChildren: () => import('./Components/utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
        path: 'Dash',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'Profile',
        loadComponent: () => import('./Components/utilisateur/profile/profile.component').then((c) => c.ProfileComponent)
      }
    ]
  },
  {
    path: 'Etudiant',
    component: EtudiantComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./Components/espace-etudiant/espace-etudiant.module').then(m => m.EspaceEtudiantModule)
      },
      {
        path: 'Profile',
        loadComponent: () => import('./Components/utilisateur/profile/profile.component').then((c) => c.ProfileComponent)
      }
    ]
  },
  {
    path: 'Formateur',
    component: FormateurComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./Components/Statistique/statistique-formateur/statistique-formateur.component').then((c) => c.StatistiqueFormateurComponent)
      },
      {
        path: 'Formations',
        loadChildren: () => import('./Components/EspaceFourmateur/formation/formation.module').then((c) => c.FormationModule)
      },
      {
        path: 'Profile',
        loadComponent: () => import('./Components/utilisateur/profile/profile.component').then((c) => c.ProfileComponent)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
