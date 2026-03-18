// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
//
// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   protected readonly title = signal('VAT e-portal');
// }
import { Component } from '@angular/core';
import { AppHeaderComponent } from './layout/app-header/app-header';
import { AppSidebarComponent } from './layout/app-sidebar/app-sidebar';
import { AppMainLayoutComponent } from './layout/app-main-layout/app-main-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppHeaderComponent, AppSidebarComponent, AppMainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'vat-portal';
}
