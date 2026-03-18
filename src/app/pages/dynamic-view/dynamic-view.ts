import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

type ViewKey =
  | 'user-management'
  | 'consignment-on-hand-listing'
  | 'list-of-replenishment-order'
  | 'vendor-stock-update'
  | 'phase-in-phase-out-proposal'
  | 'vendor-liability-claim'
  | 'item-master-data'
  | 'vendor-master-data';

interface ColumnConfig {
  columnDef: string;
  header: string;
}

interface ViewConfig {
  title: string;
  description: string;
  primaryAction?: string;
  columns: ColumnConfig[];
}

@Component({
  selector: 'app-dynamic-view',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <div class="view-wrapper" *ngIf="config">
      <div class="view-header">
        <div class="view-header-main">
          <h2 class="view-title">{{ config.title }}</h2>
          <p class="view-description">
            {{ config.description }}
          </p>
        </div>

        <div class="view-header-actions">
          <div class="filter-container">
            <mat-form-field
              appearance="outline"
              class="filter-field"
              floatLabel="auto"
            >
              <mat-label>Filter rows</mat-label>
              <mat-icon matPrefix>search</mat-icon>
              <input
                matInput
                placeholder="Type to search in this view"
                (input)="applyFilter($event)"
              />
            </mat-form-field>
          </div>

          <div class="actions-container">
            <button
              mat-stroked-button
              color="primary"
              class="export-btn"
            >
              <mat-icon>file_download</mat-icon>
              Export
            </button>

            <button
              *ngIf="config.primaryAction"
              mat-raised-button
              color="primary"
            >
              {{ config.primaryAction }}
            </button>
          </div>
        </div>
      </div>

      <mat-card class="view-card">
        <div class="table-header">
          <div class="table-title">
            <div class="title">{{ config.title }}</div>
            <div class="subtitle">
              Sample data for MVP – virtual scrolling enabled. Hook this
              up to real APIs later.
            </div>
          </div>
        </div>

        <div class="table-wrapper">
          <table
            mat-table
            [dataSource]="dataSource"
            class="mvp-table"
          >
            <ng-container
              *ngFor="let col of config.columns"
              [matColumnDef]="col.columnDef"
            >
              <th mat-header-cell *matHeaderCellDef>
                {{ col.header }}
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element[col.columnDef] ?? '—' }}
              </td>
            </ng-container>

            <tr
              mat-header-row
              *matHeaderRowDef="displayedColumns"
            ></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
            ></tr>
          </table>
        </div>
      </mat-card>
    </div>

    <div
      class="view-wrapper"
      *ngIf="!config"
    >
      <h2 class="view-title">
        {{ viewName }}
      </h2>
      <p class="view-description">
        This view is not yet configured in the MVP dynamic view
        component. You can add it to the configuration map in
        <code>dynamic-view.ts</code>.
      </p>
    </div>
  `,
  styles: [`
    .view-wrapper {
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-sizing: border-box;
    }

    .view-header {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
      margin-bottom: 8px;
    }

    .view-title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #323130;
    }

    .view-description {
      margin: 0;
      max-width: 720px;
      color: #605e5c;
      font-size: 14px;
    }

    .view-header-actions {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .filter-container {
      flex: 1 1 260px;
      max-width: 420px;
    }

    .filter-field {
      width: 100%;
    }

    .actions-container {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
      flex: 0 0 auto;
    }

    .export-btn mat-icon {
      margin-right: 4px;
    }

    .view-card {
      padding: 0;
      overflow: hidden;
    }

    .table-wrapper {
      max-height: calc(100vh - 260px);
      overflow: auto;
    }

    table.mvp-table {
      width: 100%;
      border-spacing: 0;
    }

    th.mat-mdc-header-cell,
    td.mat-mdc-cell {
      padding: 8px 16px;
      font-size: 13px;
      white-space: nowrap;
    }

    th.mat-mdc-header-cell {
      background: #f3f2f1;
      font-weight: 600;
      color: #323130;
    }

    .empty-hint {
      padding: 12px 16px 16px;
      font-size: 12px;
      color: #8a8886;
      border-top: 1px solid #edebe9;
    }
  `]
})
export class DynamicViewComponent implements OnInit {
  viewName: string = '';
  viewKey: ViewKey | null = null;

  config: ViewConfig | null = null;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  private readonly configMap: Record<ViewKey, ViewConfig> = {
    'user-management': {
      title: 'User Management',
      description:
        'Maintain portal users, their roles (Admin, Internal, Vendor) and vendor assignments. ' +
        'In the full implementation this view will connect to the identity store and D365 vendor contacts.',
      primaryAction: 'Create user',
      columns: [
        { columnDef: 'userName', header: 'User name' },
        { columnDef: 'role', header: 'Role' },
        { columnDef: 'vendor', header: 'Vendor' },
        { columnDef: 'status', header: 'Status' }
      ]
    },
    'consignment-on-hand-listing': {
      title: 'Consignment On Hand Listing',
      description:
        'Read-only overview of consignment stock by vendor and item. ' +
        'For vendor users this is filtered to their own vendor; internal users see all vendors.',
      columns: [
        { columnDef: 'vendor', header: 'Vendor' },
        { columnDef: 'item', header: 'Item' },
        { columnDef: 'location', header: 'Location' },
        { columnDef: 'onHandQty', header: 'On hand' },
        { columnDef: 'minQty', header: 'Min' },
        { columnDef: 'maxQty', header: 'Max' }
      ]
    },
    'list-of-replenishment-order': {
      title: 'List of Replenishment Orders',
      description:
        'Lifecycle view of replenishment orders created from consignment on hand, ' +
        'including quantities, statuses and PKT / D365 feedback.',
      columns: [
        { columnDef: 'orderId', header: 'Order ID' },
        { columnDef: 'vendor', header: 'Vendor' },
        { columnDef: 'item', header: 'Item' },
        { columnDef: 'qty', header: 'Qty' },
        { columnDef: 'status', header: 'Status' }
      ]
    },
    'vendor-stock-update': {
      title: 'Vendor Stock Update',
      description:
        'Weekly stock update view where vendors provide on-hand (for VMI) and WIP quantities. ' +
        'Internal users can monitor completion and liability exposure.',
      columns: [
        { columnDef: 'week', header: 'Week' },
        { columnDef: 'vendor', header: 'Vendor' },
        { columnDef: 'item', header: 'Item' },
        { columnDef: 'onHand', header: 'On hand' },
        { columnDef: 'wip', header: 'WIP' },
        { columnDef: 'status', header: 'Status' }
      ]
    },
    'phase-in-phase-out-proposal': {
      title: 'Phase In / Phase Out Proposal',
      description:
        'Decision support view showing proposals from Power BI about which vendor–item combinations ' +
        'should move into or out of VMI/VCS, including potential liability.',
      columns: [
        { columnDef: 'vendor', header: 'Vendor' },
        { columnDef: 'item', header: 'Item' },
        { columnDef: 'currentStatus', header: 'Current status' },
        { columnDef: 'proposal', header: 'Proposal' },
        { columnDef: 'liability', header: 'Liability' },
        { columnDef: 'actionStatus', header: 'Action status' }
      ]
    },
    'vendor-liability-claim': {
      title: 'Vendor Liability Claim',
      description:
        'Workflow view where vendors and internal users can create and track liability claims ' +
        'related to VMI/VCS stock, with multi-level approvals.',
      primaryAction: 'New claim',
      columns: [
        { columnDef: 'claimId', header: 'Claim ID' },
        { columnDef: 'vendor', header: 'Vendor' },
        { columnDef: 'item', header: 'Item' },
        { columnDef: 'amount', header: 'Amount' },
        { columnDef: 'status', header: 'Status' }
      ]
    },
    'item-master-data': {
      title: 'Item Master Data',
      description:
        'Read-only projection of item master data from D365, including VMI/VCS flags and quality indicators.',
      columns: [
        { columnDef: 'item', header: 'Item' },
        { columnDef: 'name', header: 'Name' },
        { columnDef: 'vmiVcsFlag', header: 'VMI/VCS flag' },
        { columnDef: 'min', header: 'Min' },
        { columnDef: 'max', header: 'Max' }
      ]
    },
    'vendor-master-data': {
      title: 'Vendor Master Data',
      description:
        'Read-only projection of vendor master data from D365, including VMI/VCS-related attributes.',
      columns: [
        { columnDef: 'vendor', header: 'Vendor' },
        { columnDef: 'name', header: 'Name' },
        { columnDef: 'country', header: 'Country' },
        { columnDef: 'status', header: 'Status' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const rawId = params.get('viewId') || '';
      this.viewName = rawId.replace(/-/g, ' ');

      const key = rawId as ViewKey;
      if (key && this.configMap[key]) {
        this.viewKey = key;
        this.config = this.configMap[key];
        this.displayedColumns = this.config.columns.map(c => c.columnDef);

        const rows: any[] = Array.from({ length: 200 }).map((_, index) =>
          this.config!.columns.reduce((acc, col, colIndex) => {
            acc[col.columnDef] = `${col.header} ${index + 1}`;
            if (colIndex === 0) {
              acc[col.columnDef] = `${col.header} #${(index + 1).toString().padStart(4, '0')}`;
            }
            return acc;
          }, {} as any)
        );

        this.dataSource = new MatTableDataSource<any>(rows);
      } else {
        this.viewKey = null;
        this.config = null;
        this.displayedColumns = [];
        this.dataSource = new MatTableDataSource<any>([]);
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = value.trim().toLowerCase();
  }
}

