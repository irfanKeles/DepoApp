import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DashboardComponent,ButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
