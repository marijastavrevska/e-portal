import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent { }
