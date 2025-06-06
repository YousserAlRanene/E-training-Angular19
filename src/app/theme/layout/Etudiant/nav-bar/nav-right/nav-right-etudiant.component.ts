// Angular import
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoggingService } from 'src/app/authorization/logging.service';
import { AuthResponseViewModel } from 'src/app/E-Training_API/models';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Project import

@Component({
  selector: 'app-nav-right-etudiant',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, RouterModule, NgScrollbarModule],
  templateUrl: './nav-right-etudiant.component.html',
  styleUrl: './nav-right-etudiant.component.scss'
})
export class NavRightEtudiantComponent implements OnInit {

  dndMode: boolean = false;
  notificationsEnabled: boolean = true;
  private loggingService = inject(LoggingService);

  userData!: AuthResponseViewModel

  ngOnInit(): void {
    this.userData = this.loggingService.getLocalStorage()
  }

  logout(): void {
    this.loggingService.logout();
  }
}
