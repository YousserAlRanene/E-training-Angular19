// Angular import
import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

// Project import
import { BerryConfig } from 'src/app/app-config';

import { FormateurConfigurationComponent } from './configuration/formateur-configuration.component';
import { FormateurNavBarComponent } from './nav-bar/formateur-nav-bar.component';
import { FormateurNavigationComponent } from './navigation/formateur-navigation.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-formateur',
  standalone: true,
  imports: [CommonModule, FormateurNavigationComponent, FormateurNavBarComponent, FormateurConfigurationComponent, RouterModule, BreadcrumbComponent],
  templateUrl: './formateur.component.html',
  styleUrl: './formateur.component.scss'
})
export class FormateurComponent implements AfterViewInit {
  private location = inject(Location);
  private locationStrategy = inject(LocationStrategy);
  cdr = inject(ChangeDetectorRef);

  // public props
  currentLayout!: string;
  navCollapsed = true;
  navCollapsedMob = false;
  windowWidth!: number;

  // Constructor

  // life cycle hook

  ngAfterViewInit() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    if (current_url === baseHref + '/layout/theme-compact' || current_url === baseHref + '/layout/box') {
      BerryConfig.isCollapse_menu = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 1025 ? BerryConfig.isCollapse_menu : false;
    this.cdr.detectChanges();
  }

  // private method
  private isThemeLayout(layout: string) {
    this.currentLayout = layout;
  }

  // public method
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-formateur-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    if (document.querySelector('app-formateur-navigation.pc-sidebar')?.classList.contains('navbar-collapsed')) {
      document.querySelector('app-formateur-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-formateur-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      document.querySelector('app-formateur-navigation.pc-sidebar')?.classList.remove('mob-open');
    }
  }
}
