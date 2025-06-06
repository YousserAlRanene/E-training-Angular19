// Angular import
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Project import

@Component({
  selector: 'app-nav-logo-formateur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-logo-formateur.component.html',
  styleUrl: './nav-logo-formateur.component.scss'
})
export class NavLogoFormateurComponent {
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
