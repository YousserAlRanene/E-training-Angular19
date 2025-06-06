import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceEtudiantRoutingModule } from './espace-etudiant-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DashboardEtudiantComponent } from './dashboard-etudiant/dashboard-etudiant.component';
import { MesInscriptionComponent } from './mes-inscription/mes-inscription.component';
import { StatistiqueEtudiantComponent } from '../Statistique/statistique-etudiant/statistique-etudiant.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';


@NgModule({
  declarations: [
    DashboardEtudiantComponent,
    MesInscriptionComponent,
    StatistiqueEtudiantComponent
  ],
  imports: [
    CommonModule,
    EspaceEtudiantRoutingModule,
    SharedModule,
    ChartDataMonthComponent,
    BarChartComponent
  ]
})
export class EspaceEtudiantModule { }
