import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourmateurListComponent } from './fourmateur-list/fourmateur-list.component';

const routes: Routes = [
  {
    path: '', component: FourmateurListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FourmateurRoutingModule { }
