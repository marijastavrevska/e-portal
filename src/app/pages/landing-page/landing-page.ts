import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPageComponent {
  // These variables represent the data that could eventually come from a backend or config file
  moduleOwner: string = '(Configurable Free text field)';
  notificationText: string = '(Configurable Free text field) (like maintenance time etc)';
}
