import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StatistiqueService } from 'src/app/E-Training_API/services/statistique.service';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { StatistiqueAdminViewModel, StatistiqueEvolutionViewModel, StatistiqueFormationParSpecialite, StatistiqueFormationParPeriode } from 'src/app/E-Training_API/models';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-statistique-admin',
  standalone: true,
  imports: [CommonModule, SharedModule, ChartDataMonthComponent, NgApexchartsModule, BarChartComponent],
  templateUrl: './statistique-admin.component.html',
  styleUrls: ['./statistique-admin.component.scss']
})
export class StatistiqueAdminComponent implements OnInit {
  adminStats: StatistiqueAdminViewModel;
  evolutionStats: StatistiqueEvolutionViewModel;
  specialitesStats: StatistiqueFormationParSpecialite[];
  periodesStats: StatistiqueFormationParPeriode[];
  loading: boolean = true;
  error: string | null = null;

  // Options pour les graphiques
  evolutionChartOptions: any;
  specialitesChartOptions: any;
  periodesChartOptions: any;

  constructor(private statistiqueService: StatistiqueService) { }

  ngOnInit(): void {
    this.loadAllStatistics();
  }

  loadAllStatistics(): void {
    this.loading = true;

    // Charger les statistiques admin
    this.statistiqueService.apiStatistiqueAdminGet().subscribe({
      next: (data: StatistiqueAdminViewModel) => {
        this.adminStats = data;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des statistiques admin';
        console.error('Error loading admin statistics:', err);
      }
    });

    // Charger les statistiques d'évolution
    this.statistiqueService.apiStatistiqueEvolutionGet().subscribe({
      next: (data: StatistiqueEvolutionViewModel) => {
        this.evolutionStats = data;
        this.prepareEvolutionChart();
      },
      error: (err) => {
        console.error('Error loading evolution statistics:', err);
      }
    });

    // Charger les statistiques par spécialité
    this.statistiqueService.apiStatistiqueSpecialitesGet().subscribe({
      next: (data: StatistiqueFormationParSpecialite[]) => {
        this.specialitesStats = data;
        this.prepareSpecialitesChart();
      },
      error: (err) => {
        console.error('Error loading speciality statistics:', err);
      }
    });

    // Charger les statistiques par période
    this.statistiqueService.apiStatistiquePeriodesGet().subscribe({
      next: (data: StatistiqueFormationParPeriode[]) => {
        this.periodesStats = data;
        this.preparePeriodesChart();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading period statistics:', err);
        this.loading = false;
      }
    });
  }

  prepareEvolutionChart(): void {
    this.evolutionChartOptions = {
      series: [
        {
          name: "Formations",
          data: this.evolutionStats.EvolutionFormations?.map(item => item.Valeur) || []
        },
        {
          name: "Inscriptions",
          data: this.evolutionStats.EvolutionInscriptions?.map(item => item.Valeur) || []
        },
        {
          name: "Utilisateurs",
          data: this.evolutionStats.EvolutionUtilisateurs?.map(item => item.Valeur) || []
        }
      ],
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: true
        }
      },
      stroke: {
        width: [3, 3, 3],
        curve: "smooth"
      },
      xaxis: {
        categories: this.evolutionStats.EvolutionFormations?.map(item => item.Date) || [],
        title: {
          text: "Date"
        }
      },
      yaxis: {
        title: {
          text: "Nombre"
        }
      },
      colors: ["#5D87FF", "#49BEFF", "#13DEB9"],
      markers: {
        size: 5
      },
      legend: {
        position: "top"
      },
      tooltip: {
        shared: true,
        intersect: false
      }
    };
  }

  prepareSpecialitesChart(): void {
    this.specialitesChartOptions = {
      series: [
        {
          name: "Formations",
          data: this.specialitesStats?.map(item => item.NombreFormations) || []
        },
        {
          name: "Inscriptions",
          data: this.specialitesStats?.map(item => item.NombreInscriptions) || []
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.specialitesStats?.map(item => item.Specialite) || [],
        title: {
          text: "Spécialité"
        }
      },
      yaxis: {
        title: {
          text: "Nombre"
        }
      },
      fill: {
        opacity: 1
      },
      colors: ["#5D87FF", "#49BEFF"],
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val;
          }
        }
      },
      legend: {
        position: "top"
      }
    };
  }

  preparePeriodesChart(): void {
    this.periodesChartOptions = {
      series: [
        {
          name: "Taux d'occupation",
          data: this.periodesStats?.map(item => item.TauxOccupation) || []
        }
      ],
      chart: {
        type: "radar",
        height: 350,
        toolbar: {
          show: true
        }
      },
      xaxis: {
        categories: this.periodesStats?.map(item => item.Periode) || []
      },
      yaxis: {
        show: false,
        max: 100
      },
      colors: ["#5D87FF"],
      markers: {
        size: 5
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + "%";
          }
        }
      }
    };
  }
}