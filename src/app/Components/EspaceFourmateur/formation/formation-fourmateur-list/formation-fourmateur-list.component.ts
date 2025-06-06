import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormationFormComponent } from 'src/app/Components/formation/formation-form/formation-form.component';
import { Formation, FormationDetailViewModel } from 'src/app/E-Training_API/models';
import { EspaceFormateurService } from 'src/app/E-Training_API/services';

@Component({
  selector: 'app-formation-fourmateur-list',
  standalone: false,
  templateUrl: './formation-fourmateur-list.component.html',
  styleUrl: './formation-fourmateur-list.component.scss'
})
export class FormationFourmateurListComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'PlacesDisponibles', "Salle", 'duree', 'nbEtudiantInscrit', 'actions'];
  dataSource: MatTableDataSource<FormationDetailViewModel>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formationService: EspaceFormateurService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<FormationDetailViewModel>();
  }

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.loading = true;
    this.formationService.apiEspaceFormateurDashboardGet().subscribe({
      next: (formations) => {
        this.dataSource.data = formations.Formations;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading formations:', error);
        this.snackBar.open('Erreur lors du chargement des formations', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewFormationDetails(formationId: string): void {
    this.router.navigate(['Formateur/Formations/Etudiant', formationId]);
  }

  openFormationDialog(): void {
    const dialogRef = this.dialog.open(FormationFormComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFormations();
      }
    });
  }
}
