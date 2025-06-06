import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StatistiqueService } from 'src/app/E-Training_API/services/statistique.service';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ActivatedRoute } from '@angular/router';
import { LoggingService } from 'src/app/authorization/logging.service';

@Component({
  selector: 'app-statistique-etudiant',
  standalone: false,
  templateUrl: './statistique-etudiant.component.html',
  styleUrls: ['./statistique-etudiant.component.scss']
})
export class StatistiqueEtudiantComponent implements OnInit {
  studentStats: any;
  loading: boolean = true;
  error: string | null = null;
  studentId: string;

  constructor(
    private statistiqueService: StatistiqueService,
    private route: ActivatedRoute,
    private loggingService: LoggingService
  ) { }

  ngOnInit(): void {
    this.studentId = this.loggingService.getLocalStorage().UserId;
    this.loadStudentStatistics();
  }

  loadStudentStatistics(): void {
    this.loading = true;
    this.statistiqueService.apiStatistiqueEtudiantEtudiantIdGet({ etudiantId: this.studentId }).subscribe({
      next: (data) => {
        this.studentStats = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des statistiques';
        this.loading = false;
        console.error('Error loading student statistics:', err);
      }
    });
  }
}
