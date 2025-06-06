import { Component, OnInit } from '@angular/core';
import { InscriptionService } from '../../../E-Training_API/services/inscription.service';
import { InscriptionViewModel } from '../../../E-Training_API/models/inscription-view-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-inscription',
  standalone: false,
  templateUrl: './mes-inscription.component.html',
  styleUrl: './mes-inscription.component.scss'
})
export class MesInscriptionComponent implements OnInit {
  inscriptions: InscriptionViewModel[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private inscriptionService: InscriptionService) { }

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions(): void {
    this.loading = true;
    this.error = null;

    this.inscriptionService.apiInscriptionMesInscriptionsGet()
      .subscribe({
        next: (data) => {
          this.inscriptions = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des inscriptions';
          this.loading = false;
          console.error('Error loading inscriptions:', err);
        }
      });
  }

  cancelInscription(inscriptionId: string | null): void {
    if (!inscriptionId) return;

    this.inscriptionService.apiInscriptionInscriptionIdDelete({ inscriptionId })
      .subscribe({
        next: () => {
          this.loadInscriptions(); // Reload the list after cancellation
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'annulation de l\'inscription';
          console.error('Error canceling inscription:', err);
        }
      });
  }
}
