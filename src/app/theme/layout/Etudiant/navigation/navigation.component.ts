// Angular import
import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavContentEtudiantComponent } from './nav-content/nav-content-etudant.component';

// project import


@Component({
  selector: 'app-etudiant-navigation',
  standalone: true,
  imports: [NavContentEtudiantComponent, CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class EtudiantNavigationComponent {
  // public props
  NavCollapsedMob = output();
  SubmenuCollapse = output();
  navCollapsedMob = false;
  windowWidth = window.innerWidth;
  themeMode!: string;

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  navSubmenuCollapse() {
    document.querySelector('app-navigation.coded-navbar')?.classList.add('coded-trigger');
  }
}
