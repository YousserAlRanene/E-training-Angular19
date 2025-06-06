import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EtudiantInscritViewModel } from 'src/app/E-Training_API/models';
import { EspaceFormateurService } from 'src/app/E-Training_API/services';

@Component({
  selector: 'app-formation-details',
  standalone: false,
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formationId: string;
  etudiants: EtudiantInscritViewModel[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private formationService: EspaceFormateurService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formationId = params['formationId'];
      this.loadEtudiants();
    });
  }

  loadEtudiants(): void {
    this.loading = true;
    this.formationService.apiEspaceFormateurFormationsFormationIdEtudiantsGet({ formationId: this.formationId })
      .subscribe({
        next: (etudiants) => {
          this.etudiants = etudiants;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading students:', error);
          this.snackBar.open('Erreur lors du chargement des étudiants', 'Fermer', { duration: 3000 });
          this.loading = false;
        }
      });
  }
}
