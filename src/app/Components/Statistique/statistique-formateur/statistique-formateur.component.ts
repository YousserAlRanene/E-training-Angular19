import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StatistiqueService } from 'src/app/E-Training_API/services/statistique.service';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ActivatedRoute } from '@angular/router';
import { LoggingService } from 'src/app/authorization/logging.service';
import { StatistiqueFormateurViewModel } from 'src/app/E-Training_API/models';

@Component({
  selector: 'app-statistique-formateur',
  standalone: true,
  imports: [CommonModule, SharedModule, ChartDataMonthComponent, BarChartComponent],
  templateUrl: './statistique-formateur.component.html',
  styleUrls: ['./statistique-formateur.component.scss']
})
export class StatistiqueFormateurComponent implements OnInit {
  trainerStats: StatistiqueFormateurViewModel;
  loading: boolean = true;
  error: string | null = null;
  trainerId: string;

  constructor(
    private statistiqueService: StatistiqueService,
    private route: ActivatedRoute,
    private loggingService: LoggingService
  ) { }

  ngOnInit(): void {
    this.trainerId = this.loggingService.getLocalStorage().UserId;
    this.loadTrainerStatistics();
  }

  loadTrainerStatistics(): void {
    this.loading = true;
    this.statistiqueService.apiStatistiqueFormateurFormateurIdGet({ formateurId: this.trainerId }).subscribe({
      next: (data: StatistiqueFormateurViewModel) => {
        this.trainerStats = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des statistiques';
        this.loading = false;
        console.error('Error loading trainer statistics:', err);
      }
    });
  }

}
