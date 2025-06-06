import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscriptionService } from '../../../E-Training_API/services/inscription.service';
import { InscriptionViewModel } from '../../../E-Training_API/models/inscription-view-model';

@Component({
  selector: 'app-inscription-list',
  standalone: false,
  templateUrl: './inscription-list.component.html',
  styleUrl: './inscription-list.component.scss'
})
export class InscriptionListComponent implements OnInit {
  displayedColumns: string[] = ['NomEtudiant', 'date', 'actions'];
  dataSource: MatTableDataSource<InscriptionViewModel>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inscriptionService: InscriptionService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<InscriptionViewModel>();
  }

  ngOnInit(): void {
    this.loadInscriptions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadInscriptions(): void {
    this.loading = true;
    this.inscriptionService.apiInscriptionGet().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des inscriptions:', error);
        this.snackBar.open('Erreur lors du chargement des inscriptions', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
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

  deleteInscription(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      this.inscriptionService.apiInscriptionInscriptionIdDelete({ inscriptionId: id }).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(inscription => inscription.Id !== id);
          this.snackBar.open('Inscription supprimée avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'inscription', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
