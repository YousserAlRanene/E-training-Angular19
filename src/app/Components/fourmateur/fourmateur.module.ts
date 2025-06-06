import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FourmateurRoutingModule } from './fourmateur-routing.module';
import { FourmateurFormComponent } from './fourmateur-form/fourmateur-form.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FourmateurListComponent } from './fourmateur-list/fourmateur-list.component';


@NgModule({
  declarations: [
    FourmateurFormComponent,
    FourmateurListComponent
  ],
  imports: [
    CommonModule,
    FourmateurRoutingModule,
    SharedModule,

  ]
})
export class FourmateurModule { }
