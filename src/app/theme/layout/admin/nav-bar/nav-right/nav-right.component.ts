// Angular import
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggingService } from 'src/app/authorization/logging.service';
import { AuthResponseViewModel } from 'src/app/E-Training_API/models';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule, FormsModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {

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
