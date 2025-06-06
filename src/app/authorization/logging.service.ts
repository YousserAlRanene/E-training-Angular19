import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../E-Training_API/services';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { AuthResponseViewModel, LoginViewModel } from '../E-Training_API/models';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private tokenKey = 'AccessToken';

  private http = inject(HttpClient);
  private router = inject(Router);
  private _authServices = inject(AccountService);

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/guest/login']);
  }

  setLocalStorage(response: AuthResponseViewModel) {
    localStorage.setItem("Email", response.Email);
    localStorage.setItem("Nom", response.Nom);
    localStorage.setItem("Prenom", response.Prenom);
    localStorage.setItem("Role", response.Role);
    localStorage.setItem("UserId", response.UserId);
    this.setToken(response.Token)
  }

  getLocalStorage(): AuthResponseViewModel {
    return {
      Email: localStorage.getItem("Email"),
      Nom: localStorage.getItem("Nom"),
      Prenom: localStorage.getItem("Prenom"),
      Role: localStorage.getItem("Role"),
      UserId: localStorage.getItem("UserId"),
      Token: localStorage.getItem(this.tokenKey)
    }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem("Role");
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private decodeToken(token: string): any {
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}
