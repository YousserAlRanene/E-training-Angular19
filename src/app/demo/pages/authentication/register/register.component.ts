// angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/E-Training_API/services';
import { AuthResponseViewModel, RegisterViewModel } from 'src/app/E-Training_API/models';
import { catchError, finalize, of, tap } from 'rxjs';
import { LoggingService } from 'src/app/authorization/logging.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: LoggingService,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const registerData: RegisterViewModel = {
        Prenom: this.registerForm.value.prenom,
        Nom: this.registerForm.value.nom,
        Email: this.registerForm.value.email,
        Password: this.registerForm.value.password,
        ConfirmPassword: this.registerForm.value.confirmPassword
      };

      this.accountService.apiAccountRegisterPost({ body: registerData })
        .pipe(
          tap((response: AuthResponseViewModel) => {
            this.authService.setLocalStorage(response);
            this.router.navigate(['/']); // Redirection vers la racine qui déclenchera le roleGuard
          }),
          catchError((error) => {
            this.loading = false;
            this.errorMessage = 'Échec de l\'inscription. Veuillez vérifier vos informations.';
            console.error('Registration failed:', error);
            return of(error);
          }),
          finalize(() => {
            this.loading = false;
            console.log('Registration request complete');
          })
        )
        .subscribe();
    }
  }
}
