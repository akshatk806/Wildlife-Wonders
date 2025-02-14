import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService, 
    private cartService: CartService,
    private snackBar: MatSnackBar) { }

  // as soon as component renders we have our data fetched
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        // show the snackbar
        this.snackBar.open("Product added to cart!", "", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });  
      }
    });
  }
}
