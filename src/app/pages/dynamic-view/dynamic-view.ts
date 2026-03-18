import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-view',
  standalone: true,
  imports: [],
  template: `
    <div class="view-container">
      <h2>{{ viewName }} : works</h2>
    </div>
  `,
  styles: [`
    .view-container {
      padding: 40px;
      font-size: 24px;
      color: #323130;
      font-weight: 600;
    }
  `]
})
export class DynamicViewComponent implements OnInit {
  viewName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // This listens to the URL changes and updates the variable instantly
    this.route.paramMap.subscribe(params => {
      const rawId = params.get('viewId') || '';
      // Replaces dashes with spaces for the display text
      this.viewName = rawId.replace(/-/g, ' ');
    });
  }
}
