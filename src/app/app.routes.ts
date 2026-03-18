// import { Routes } from '@angular/router';
// import { LandingPageComponent } from './pages/landing-page/landing-page'; // (Vendor page)
// import { CustomerComponent } from './pages/customer/customer';
// import { ProductComponent } from './pages/product/product';
//
// export const routes: Routes = [
//   // When the URL is empty, automatically redirect to the vendor page
//   { path: '', redirectTo: 'vendor', pathMatch: 'full' },
//
//   // Map our paths to the correct components
//   { path: 'vendor', component: LandingPageComponent },
//   { path: 'customer', component: CustomerComponent },
//   { path: 'product', component: ProductComponent }
// ];
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page';
import { CustomerComponent } from './pages/customer/customer';
import { ProductComponent } from './pages/product/product';
import { DynamicViewComponent } from './pages/dynamic-view/dynamic-view';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'vendor', pathMatch: 'full' },
  {
    path: 'vendor',
    component: LandingPageComponent,
    data: { module: 'Vendor', title: 'User Landing Page' }
  },
  {
    path: 'vendor/:viewId',
    component: DynamicViewComponent,
    data: { module: 'Vendor' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { module: 'Dashboard', title: 'VMI/VCS Operations' }
  },
  {
    path: 'customer',
    component: CustomerComponent,
    data: { module: 'Customer', title: 'Customer' }
  },
  {
    path: 'product',
    component: ProductComponent,
    data: { module: 'Product', title: 'Product' }
  }
];
