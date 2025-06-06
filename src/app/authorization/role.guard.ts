import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanActivateFn } from '@angular/router';
import { LoggingService } from './logging.service';

export const roleGuard: CanActivateFn = () => {
  const auth = inject(LoggingService)
  const router = inject(Router)

  const userRole = auth.getUserRole();

  switch (userRole) {
    case 'Administrateur':
      router.navigate(['/Admin']);
      break;
    case 'Etudiant':
      router.navigate(['/Etudiant']);
      break;
    case 'Formateur':
      router.navigate(['/Formateur']);
      break;
    default:
      router.navigate(['/guest/login']);
  }

  return false;
}
