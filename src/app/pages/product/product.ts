import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent { }
