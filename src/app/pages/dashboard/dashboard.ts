import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface KpiTile {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  helper: string;
}

interface TimelineEvent {
  title: string;
  subtitle: string;
  when: string;
  status: 'open' | 'wip' | 'done';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  kpis: KpiTile[] = [
    {
      label: 'Active VMI/VCS items',
      value: '248',
      trend: 'up',
      helper: 'Items currently under VMI/VCS agreements'
    },
    {
      label: 'Open replenishment orders',
      value: '17',
      trend: 'flat',
      helper: 'Awaiting PKT fulfillment / receipt confirmation'
    },
    {
      label: 'Pending Phase In/Out actions',
      value: '9',
      trend: 'up',
      helper: 'Decisions required from CM / SCP'
    },
    {
      label: 'Open vendor liability claims',
      value: '3',
      trend: 'down',
      helper: 'Claims currently in review or approval'
    }
  ];

  events: TimelineEvent[] = [
    {
      title: 'Replenishment order RPL-CH-0045 pre-received',
      subtitle: 'Vendor 100043 · Item 800145-01 · VCS',
      when: '5 min ago',
      status: 'wip'
    },
    {
      title: 'New Phase Out proposal available',
      subtitle: 'Vendor 100221 · 4 items with high liability',
      when: '25 min ago',
      status: 'open'
    },
    {
      title: 'Vendor stock update window opened',
      subtitle: 'Week 12 · 84% completion for VMI · 72% for VCS',
      when: 'Today, 08:00',
      status: 'wip'
    },
    {
      title: 'VMI/VCS performance dashboard refreshed',
      subtitle: 'Last refresh: Today 06:30 · Source: Power BI',
      when: 'Today, 06:30',
      status: 'done'
    }
  ];

  shortcuts = [
    {
      label: 'Phase In / Phase Out',
      description: 'Review proposals and update action status',
      icon: 'sync_alt'
    },
    {
      label: 'Consignment On Hand',
      description: 'Check VCS stock health by vendor and item',
      icon: 'inventory_2'
    },
    {
      label: 'Vendor Stock Update',
      description: 'Monitor weekly submissions and liabilities',
      icon: 'analytics'
    },
    {
      label: 'Replenishment Orders',
      description: 'Track open and partially received orders',
      icon: 'local_shipping'
    }
  ];
}

