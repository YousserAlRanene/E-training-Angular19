import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationRoutingModule } from './formation-routing.module';
import { FormationListComponent } from './formation-list/formation-list.component';
import { FormationFormComponent } from './formation-form/formation-form.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [
    FormationListComponent,
    FormationFormComponent
  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    SharedModule,

  ]
})
export class FormationModule { }
