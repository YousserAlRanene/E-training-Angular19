import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../E-Training_API/services/admin.service';
import { FormateurViewModel } from '../../../E-Training_API/models/formateur-view-model';

@Component({
  selector: 'app-fourmateur-form',
  standalone: false,
  templateUrl: './fourmateur-form.component.html',
  styleUrls: ['./fourmateur-form.component.scss']
})
export class FourmateurFormComponent implements OnInit {
  formateurForm: FormGroup;
  loading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<FourmateurFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: FormateurViewModel
  ) {
    this.isEditMode = !!data;
    this.formateurForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      specialite: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    const overlay = document.querySelector('.cdk-overlay-container') as HTMLElement;
    if (overlay) {
      overlay.style.zIndex = '2000';
    }
    if (this.isEditMode) {
      this.formateurForm.patchValue({
        nom: this.data.Nom,
        prenom: this.data.Prenom,
        email: this.data.Email,
        specialite: this.data.Specialite,
      });
    }
  }

  onSubmit(): void {
    if (this.formateurForm.valid) {
      this.loading = true;
      const formateurData = {
        ...this.formateurForm.value,
        role: 1 // Role Formateur
      };

      if (this.isEditMode) {
        this.adminService.apiAdminFormateursIdPut({
          id: this.data.Id!,
          body: formateurData
        }).subscribe({
          next: () => {
            this.snackBar.open('Formateur modifié avec succès', 'Fermer', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Erreur lors de la modification du formateur:', error);
            this.snackBar.open('Erreur lors de la modification du formateur', 'Fermer', { duration: 3000 });
            this.loading = false;
          }
        });
      } else {
        this.adminService.apiAdminFormateursPost({
          body: formateurData
        }).subscribe({
          next: () => {
            this.snackBar.open('Formateur ajouté avec succès', 'Fermer', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du formateur:', error);
            this.snackBar.open('Erreur lors de l\'ajout du formateur', 'Fermer', { duration: 3000 });
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
