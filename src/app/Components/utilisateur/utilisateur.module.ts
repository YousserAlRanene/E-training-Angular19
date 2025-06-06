import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateursListComponent } from './utilisateurs-list/utilisateurs-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';

@NgModule({
  declarations: [
    UtilisateursListComponent,
    InscriptionListComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    SharedModule
  ]
})
export class UtilisateurModule { }
