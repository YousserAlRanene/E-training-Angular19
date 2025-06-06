import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../../../E-Training_API/services/admin.service';
import { FormateurViewModel } from '../../../E-Training_API/models/formateur-view-model';
import { FourmateurFormComponent } from '../fourmateur-form/fourmateur-form.component';

@Component({
  selector: 'app-fourmateur-list',
  standalone: false,
  templateUrl: './fourmateur-list.component.html',
  styleUrls: ['./fourmateur-list.component.scss']
})
export class FourmateurListComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'specialite', 'status', 'actions'];
  dataSource: MatTableDataSource<FormateurViewModel>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<FormateurViewModel>();
  }

  ngOnInit(): void {
    this.loadFormateurs();
  }

  loadFormateurs(): void {
    this.loading = true;
    this.adminService.apiAdminFormateursGet().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des formateurs:', error);
        this.snackBar.open('Erreur lors du chargement des formateurs', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openFormateurForm(formateur?: FormateurViewModel): void {
    const dialogRef = this.dialog.open(FourmateurFormComponent, {
      width: '600px',
      data: formateur
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFormateurs();
      }
    });
  }

  toggleStatus(formateur: FormateurViewModel): void {
    this.adminService.apiAdminUtilisateursIdStatusPut({
      id: formateur.Id!,
    }).subscribe({
      next: (msg: string) => {
        this.snackBar.open(msg, 'Fermer', { duration: 3000 });
        this.loadFormateurs();
      },
      error: (error: string) => {
        console.error(error, error);
        this.snackBar.open(error, 'Fermer', { duration: 3000 });
        this.loadFormateurs();
      },
    });
  }

  resetPassword(formateur: FormateurViewModel): void {
    this.adminService.apiAdminFormateursIdResetPasswordPost({ id: formateur.Id! }).subscribe({
      next: (response) => {
        this.snackBar.open(
          `Mot de passe réinitialisé avec succès: ${response.NewPassword}`,
          'Fermer',
          { duration: 5000 }
        );
      },
      error: (error) => {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        this.snackBar.open('Erreur lors de la réinitialisation du mot de passe', 'Fermer', { duration: 3000 });
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
}
