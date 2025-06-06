import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoggingService } from './logging.service';

export const authGuard: CanActivateFn = () => {
    const auth = inject(LoggingService)
    const router = inject(Router)

    if (auth.isAuthenticated()) {
        return true;
    }

    router.navigate(['/guest/login']);
    return false;
};