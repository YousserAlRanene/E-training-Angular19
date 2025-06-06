// angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggingService } from 'src/app/authorization/logging.service';
import { AccountService } from 'src/app/E-Training_API/services';
import { AuthResponseViewModel, LoginViewModel } from 'src/app/E-Training_API/models';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = "";

  constructor(
    private authService: LoggingService,
    private _authServices: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const loginData: LoginViewModel = {
        Email: this.loginForm.value.email,
        Password: this.loginForm.value.password,
        RememberMe: this.loginForm.value.rememberMe
      };
      this._authServices.apiAccountLoginPost({ body: loginData })
        .pipe(
          tap((response: AuthResponseViewModel) => {
            this.authService.setLocalStorage(response);
            this.router.navigate(['/']); // Redirection vers la racine qui déclenchera le roleGuard
          }),
          catchError((error) => {
            this.loading = false;
            this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
            console.error('Login failed:', error);
            return of(error);
          }),
          finalize(() => {
            this.loading = false;
            console.log('Login request complete');
          })
        )
        .subscribe();
    }
  }
}
