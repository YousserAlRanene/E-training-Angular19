import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationListComponent } from './formation-list/formation-list.component';
import { FourmateurListComponent } from '../fourmateur/fourmateur-list/fourmateur-list.component';

const routes: Routes = [
  {
    path: '', component: FormationListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
