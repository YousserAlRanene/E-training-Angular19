import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateursListComponent } from './utilisateurs-list/utilisateurs-list.component';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'Utilisateurs',
    component: UtilisateursListComponent
  },
  {
    path: 'Inscription',
    component: InscriptionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
