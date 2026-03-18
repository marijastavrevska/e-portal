// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-main-layout',
//   imports: [],
//   templateUrl: './app-main-layout.html',
//   styleUrl: './app-main-layout.scss',
// })
// export class AppMainLayoutComponent {
//
// }
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { LandingPageComponent } from '../../pages/landing-page/landing-page'; // Adjust path if needed
//
// @Component({
//   selector: 'app-main-layout',
//   standalone: true,
//   imports: [RouterOutlet, LandingPageComponent],
//   templateUrl: './app-main-layout.html',
//   styleUrl: './app-main-layout.scss'
// })
// export class AppMainLayoutComponent { }
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app-main-layout.html',
  styleUrl: './app-main-layout.scss'
})
export class AppMainLayoutComponent { }
