import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService, FormationService } from 'src/app/E-Training_API/services';
import { Formation, Utilisateur } from 'src/app/E-Training_API/models';
import { CreateFormationViewModel } from 'src/app/E-Training_API/models/create-formation-view-model';

@Component({
  standalone: false,
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrl: './formation-form.component.scss'
})
export class FormationFormComponent implements OnInit {
  formationForm: FormGroup;
  isEditMode = false;
  loading = false;
  availableFormateurs: any[] = [];
  constructor(
    private fb: FormBuilder,
    private formationService: FormationService,
    private dialogRef: MatDialogRef<FormationFormComponent>,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Formation
  ) {
    this.formationForm = this.fb.group({
      Titre: ['', [Validators.required, Validators.minLength(3)]],
      Description: ['', [Validators.required, Validators.minLength(10)]],
      DateDebut: ['', [Validators.required]],
      DateFin: ['', [Validators.required]],
      Salle: ['', [Validators.required]],
      PlacesDisponibles: ['', [Validators.required, Validators.min(1)]],
      FormateurIds: [[]]
    });
  }

  ngOnInit(): void {
    const overlay = document.querySelector('.cdk-overlay-container') as HTMLElement;
    if (overlay) {
      overlay.style.zIndex = '2000';
    }
    if (this.data) {
      this.isEditMode = true;
      const formationData = {
        ...this.data,
        DateDebut: this.data.DateDebut ? new Date(this.data.DateDebut).toISOString().split('T')[0] : '',
        DateFin: this.data.DateFin ? new Date(this.data.DateFin).toISOString().split('T')[0] : '',
        FormateurIds: this.data.Formateurs?.map(f => f.Id) || []
      };
      this.formationForm.patchValue(formationData);
    }
    this.loadFormateurs();
  }

  loadFormateurs(): void {
    this.adminService.apiAdminFormateursGet().subscribe({
      next: (data) => {
        this.availableFormateurs = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des formateurs:', error);
        this.snackBar.open('Erreur lors du chargement des formateurs', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.formationForm.valid) {
      this.loading = true;
      const formValue = this.formationForm.value;

      // Créer l'objet selon le modèle CreateFormationViewModel
      const formationData: CreateFormationViewModel = {
        Titre: formValue.Titre,
        Description: formValue.Description,
        DateDebut: formValue.DateDebut,
        DateFin: formValue.DateFin,
        Salle: formValue.Salle,
        PlacesDisponibles: formValue.PlacesDisponibles,
        FormateurIds: formValue.FormateurIds,
        Id: this.isEditMode ? this.data.Id : undefined
      };

      if (this.isEditMode) {
        this.formationService.apiFormationIdPut({
          id: this.data.Id!,
          body: formationData
        }).subscribe({
          next: () => {
            this.snackBar.open('Formation mise à jour avec succès', 'Fermer', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error updating formation:', error);
            this.snackBar.open('Erreur lors de la mise à jour de la formation', 'Fermer', { duration: 3000 });
            this.loading = false;
          }
        });
      } else {
        this.formationService.apiFormationPost({
          body: formationData
        }).subscribe({
          next: () => {
            this.snackBar.open('Formation créée avec succès', 'Fermer', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error creating formation:', error);
            this.snackBar.open('Erreur lors de la création de la formation', 'Fermer', { duration: 3000 });
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
