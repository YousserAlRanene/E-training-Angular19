// Angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project import
import { NavLogoFormateurComponent } from './nav-logo/nav-logo-formateur.component';
import { NavLeftFormateurComponent } from './nav-left/nav-left-formateur.component';
import { NavRightFormateurComponent } from './nav-right/nav-right-formateur.component';

@Component({
  selector: 'app-formateur-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavLogoFormateurComponent, NavLeftFormateurComponent, NavRightFormateurComponent],
  templateUrl: './formateur-nav-bar.component.html',
  styleUrl: './formateur-nav-bar.component.scss'
})
export class FormateurNavBarComponent {
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
