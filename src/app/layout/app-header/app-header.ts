import { Component } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeaderComponent {
  breadcrumbModule: string = '';
  breadcrumbTitle: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumb());
  }

  private updateBreadcrumb() {
    let route = this.activatedRoute.firstChild;

    while (route?.firstChild) {
      route = route.firstChild;
    }

    if (!route) {
      this.breadcrumbModule = '';
      this.breadcrumbTitle = '';
      return;
    }

    const data = route.snapshot.data as { module?: string; title?: string };
    this.breadcrumbModule = data.module ?? '';

    let title = data.title ?? '';

    // If there is no static title (e.g. dynamic vendor views), derive it from the URL param.
    if (!title) {
      const viewId = route.snapshot.paramMap.get('viewId');
      if (viewId) {
        title = viewId.replace(/-/g, ' ');
      }
    }

    this.breadcrumbTitle = title;
  }
}
