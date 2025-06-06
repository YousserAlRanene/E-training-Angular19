// Angular import
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project import
import { BerryConfig } from 'src/app/app-config';
import { EtudiantNavigationItems } from './etudiant-navigation-items';
import { NavContentEtudiantComponent } from './nav-content/nav-content-etudant.component';

@Component({
  selector: 'app-etudiant-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavContentEtudiantComponent],
  templateUrl: './etudiant-navigation.component.html',
  styleUrl: './etudiant-navigation.component.scss'
})
export class EtudiantNavigationComponent {
  // public props
  NavCollapsedMob = new EventEmitter<void>();
  SubmenuCollapse = new EventEmitter<void>();
  navCollapsedMob = false;
  windowWidth = window.innerWidth;
  themeMode!: string;

  // Get navigation items from navigation service
  navigations: any[] = EtudiantNavigationItems;

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  navSubmenuCollapse() {
    document.querySelector('app-etudiant-navigation.coded-navbar')?.classList.add('coded-trigger');
  }
} 