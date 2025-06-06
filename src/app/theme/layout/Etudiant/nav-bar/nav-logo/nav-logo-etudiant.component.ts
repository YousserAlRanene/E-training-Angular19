// Angular import
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project import

@Component({
    selector: 'app-nav-logo-etudiant',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './nav-logo-etudiant.component.html',
    styleUrl: './nav-logo-etudiant.component.scss'
})
export class NavLogoEtudiantComponent {
    // public props
    @Output() NavCollapse = new EventEmitter();
    @Input() navCollapsed!: boolean;
    windowWidth: number;

    // Constructor
    constructor() {
        this.windowWidth = window.innerWidth;
    }

    navCollapse() {
        this.NavCollapse.emit();
    }
} 