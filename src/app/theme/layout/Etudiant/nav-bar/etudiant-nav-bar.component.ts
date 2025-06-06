// Angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project import
import { NavLogoEtudiantComponent } from './nav-logo/nav-logo-etudiant.component';
import { NavLeftEtudiantComponent } from './nav-left/nav-left-etudiant.component';
import { NavRightEtudiantComponent } from './nav-right/nav-right-etudiant.component';

@Component({
    selector: 'app-etudiant-nav-bar',
    standalone: true,
    imports: [CommonModule, RouterModule, NavLogoEtudiantComponent, NavLeftEtudiantComponent, NavRightEtudiantComponent],
    templateUrl: './etudiant-nav-bar.component.html',
    styleUrl: './etudiant-nav-bar.component.scss'
})
export class EtudiantNavBarComponent {
    // public props
    @Output() NavCollapse = new EventEmitter<void>();
    @Output() NavCollapsedMob = new EventEmitter<void>();
    navCollapsed: boolean;
    windowWidth: number;

    constructor() {
        this.windowWidth = window.innerWidth;
        this.navCollapsed = this.windowWidth >= 1025;
    }

    // public method
    navCollapse() {
        if (this.windowWidth >= 1025) {
            this.navCollapsed = !this.navCollapsed;
            this.NavCollapse.emit();
        }
    }

    navCollapseMob() {
        if (this.windowWidth < 1025) {
            this.NavCollapsedMob.emit();
        }
    }
} 