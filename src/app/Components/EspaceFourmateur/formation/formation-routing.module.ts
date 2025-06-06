import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationFourmateurListComponent } from './formation-fourmateur-list/formation-fourmateur-list.component';
import { FormationDetailsComponent } from './formation-details/formation-details.component';

const routes: Routes = [
  {
    path: "", component: FormationFourmateurListComponent
  },
  {
    path: "Etudiant/:formationId", component: FormationDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
