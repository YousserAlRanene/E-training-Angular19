import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationService } from 'src/app/E-Training_API/services';
import { Formation } from 'src/app/E-Training_API/models';
import { FormationFormComponent } from '../formation-form/formation-form.component';

@Component({
  standalone: false,
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'PlacesDisponibles', "Salle", 'duree', 'actions'];
  dataSource: MatTableDataSource<Formation>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formationService: FormationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Formation>();
  }

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.loading = true;
    this.formationService.apiFormationGet().subscribe({
      next: (formations) => {
        this.dataSource.data = formations;
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

  openFormationDialog(formation?: Formation): void {
    const dialogRef = this.dialog.open(FormationFormComponent, {
      width: '60%',
      data: formation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFormations();
      }
    });
  }

  deleteFormation(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.formationService.apiFormationIdDelete({ id: id }).subscribe({
        next: () => {
          this.snackBar.open('Formation supprimée avec succès', 'Fermer', { duration: 3000 });
          this.loadFormations();
        },
        error: (error) => {
          console.error('Error deleting formation:', error);
          this.snackBar.open('Erreur lors de la suppression de la formation', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
