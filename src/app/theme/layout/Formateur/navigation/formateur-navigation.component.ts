// Angular import
import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavContentFormateurComponent } from './nav-content/nav-content-formateur.component';

// project import


@Component({
  selector: 'app-formateur-navigation',
  standalone: true,
  imports: [NavContentFormateurComponent, CommonModule, RouterModule],
  templateUrl: './formateur-navigation.component.html',
  styleUrl: './formateur-navigation.component.scss'
})
export class FormateurNavigationComponent {
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
    document.querySelector('app-formateur-navigation.coded-navbar')?.classList.add('coded-trigger');
  }
}
