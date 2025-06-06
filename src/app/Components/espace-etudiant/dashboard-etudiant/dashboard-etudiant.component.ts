import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationService } from 'src/app/E-Training_API/services/formation.service';
import { Formation, InscriptionViewModel, StatutInscription } from 'src/app/E-Training_API/models';
import { InscriptionService } from 'src/app/E-Training_API/services/inscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-etudiant',
  standalone: false,
  templateUrl: './dashboard-etudiant.component.html',
  styleUrl: './dashboard-etudiant.component.scss'
})
export class DashboardEtudiantComponent implements OnInit {
  formations: Formation[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private formationService: FormationService,
    private inscriptionService: InscriptionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.loading = true;
    this.formationService.apiFormationGet().subscribe({
      next: (data) => {
        this.formations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des formations';
        this.loading = false;
        console.error('Error loading formations:', err);
      }
    });
  }

  sAbonner(formationId: string | null | undefined): void {
    if (!formationId) return;

    this.inscriptionService.apiInscriptionInscriptionPost({
      FormationId: formationId
    }).subscribe({
      next: (response: InscriptionViewModel) => {
        this.snackBar.open('Inscription effectuée avec succès', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadFormations();
      },
      error: (err: any) => {
        this.snackBar.open(err.error, 'Fermer', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }
}
