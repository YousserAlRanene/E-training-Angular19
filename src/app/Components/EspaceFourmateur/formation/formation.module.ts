import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { FormationFourmateurListComponent } from './formation-fourmateur-list/formation-fourmateur-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormationDetailsComponent } from './formation-details/formation-details.component';


@NgModule({
  declarations: [
    FormationFourmateurListComponent,
    FormationDetailsComponent
  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    SharedModule
  ]
})
export class FormationModule { }
