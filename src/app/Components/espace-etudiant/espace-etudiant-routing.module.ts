import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardEtudiantComponent } from './dashboard-etudiant/dashboard-etudiant.component';
import { MesInscriptionComponent } from './mes-inscription/mes-inscription.component';

const routes: Routes = [
  { path: "", component: DashboardEtudiantComponent },
  { path: "MesInscrits", component: MesInscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceEtudiantRoutingModule { }
