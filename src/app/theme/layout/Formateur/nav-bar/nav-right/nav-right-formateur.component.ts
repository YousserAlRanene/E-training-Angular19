// Angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoggingService } from 'src/app/authorization/logging.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthResponseViewModel } from 'src/app/E-Training_API/models';

// Project import

@Component({
  selector: 'app-nav-right-formateur',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule, FormsModule],
  templateUrl: './nav-right-formateur.component.html',
  styleUrl: './nav-right-formateur.component.scss'
})
export class NavRightFormateurComponent {
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
