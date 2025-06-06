import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../../../E-Training_API/services/admin.service';
import { UserStatusViewModel } from '../../../E-Training_API/models/user-status-view-model';

@Component({
  selector: 'app-utilisateurs-list',
  standalone: false,
  templateUrl: './utilisateurs-list.component.html',
  styleUrl: './utilisateurs-list.component.scss'
})
export class UtilisateursListComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'role', 'status'];
  dataSource: MatTableDataSource<UserStatusViewModel>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<UserStatusViewModel>();
  }

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.loading = true;
    this.adminService.apiAdminUtilisateursGet().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        this.snackBar.open('Erreur lors du chargement des utilisateurs', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  toggleStatus(utilisateur: UserStatusViewModel): void {
    this.adminService.apiAdminUtilisateursIdStatusPut({
      id: utilisateur.Id!,
    }).subscribe({
      next: (msg: string) => {
        this.snackBar.open(msg, 'Fermer', { duration: 3000 });
        this.loadUtilisateurs();
      },
      error: (error: any) => {
        console.error(error?.error, error);
        this.snackBar.open(error?.error, 'Fermer', { duration: 3000 });
        this.loadUtilisateurs();
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRoleLabel(role: number): string {
    switch (role) {
      case 0:
        return 'Administrateur';
      case 1:
        return 'Formateur';
      case 2:
        return 'Etudiant';
      default:
        return 'Inconnu';
    }
  }
}
