// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [],
//   templateUrl: './app-sidebar.html', // Note: update this to .component.html if that is your filename!
//   styleUrl: './app-sidebar.scss'     // Note: update this to .component.scss if that is your filename!
// })
// export class AppSidebarComponent {
//   // This variable tracks the state of the dropdown.
//   // We set it to true so it matches your screenshot by default.
//   isModulesExpanded: boolean = true;
//
//   // This function flips the state between true and false
//   toggleModules() {
//     this.isModulesExpanded = !this.isModulesExpanded;
//   }
// }

// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router'; // <-- Add this import
//
// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive], // <-- Add them to the imports array
//   templateUrl: './app-sidebar.html',
//   styleUrl: './app-sidebar.scss'
// })
// export class AppSidebarComponent {
//   isModulesExpanded: boolean = true;
//
//   toggleModules() {
//     this.isModulesExpanded = !this.isModulesExpanded;
//   }
// }

import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatButtonModule],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.scss'
})
export class AppSidebarComponent {
  isModulesExpanded: boolean = true;
  isSecondaryPaneOpen: boolean = false; // Tracks if the flyout is open

  // 1. Inject ElementRef into the constructor so the component can check its own boundaries
  constructor(private elementRef: ElementRef) {}

  // 2. Add the HostListener to watch for clicks anywhere on the page
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    // If the pane is open AND the thing the user clicked is NOT inside the sidebar...
    if (this.isSecondaryPaneOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isSecondaryPaneOpen = false; // ...close the pane!
    }
  }


  // Your list of views
  vendorViews: string[] = [
    'User Management', 'Phase In/Phase Out Proposal', 'Item Master Data',
    'Vendor Master Data', 'Attachment View', 'Consignment On Hand Listing',
    'List of Replenishment Order', 'Contact Matrix', 'Purchase Agreement Lines',
    'Vendor Stock Update', 'Notification to Vendor', 'Approved Vendor List',
    'List of Inventory Transaction', 'List of D365 VCS Purchase Order',
    'List of Cycle Count', 'Logistic Team Contact', 'Reason Code',
    'Problem Code', 'Vendor-Item Additional Data', 'Vendor Module Parameter',
    'Vendor Liability Claim', 'Vendor-Item Additional Data Changes History',
    'VMI Performance Dashboard', 'VCS Performance Dashboard',
    'VMI Demand & Supply report', 'VCS Demand & Supply report',
    'VMI/VCS Internal Dashboard'
  ];

  toggleModules() {
    this.isModulesExpanded = !this.isModulesExpanded;
  }

  // Opens/closes the flyout pane
  toggleSecondaryPane() {
    this.isSecondaryPaneOpen = !this.isSecondaryPaneOpen;
  }

  // Helper to turn "User Management" into "user-management" for clean URLs
  formatUrl(viewName: string): string {
    return viewName.toLowerCase().replace(/[\s/&]+/g, '-');
  }
}
